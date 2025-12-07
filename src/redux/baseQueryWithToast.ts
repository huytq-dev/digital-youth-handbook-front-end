import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { baseUrl } from '@/config';
import { authService } from '@/features/auth/auth.storage';
import type { ApiResponse } from '@/features/common/common.type';
import { isApiResponseSuccess } from '@/features/common/common.type';
import { ResponseType } from '@/features/common/response-types';
import { showToast } from '@/lib/toast';
import type { SignInResponseDataModel } from '@/features/auth/auth.type';

/**
 * Mutex để khóa tiến trình refresh token
 * Đảm bảo chỉ 1 request refresh chạy tại 1 thời điểm, tránh race condition
 */
const mutex = new Mutex();

/**
 * Custom baseQuery với auto toast notification
 * Tự động bắt và hiển thị message từ backend API response
 * 
 * QUAN TRỌNG: credentials: 'include' để gửi/nhận HttpOnly cookies
 */
const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  credentials: 'include', // Bắt buộc để gửi/nhận HttpOnly cookies
  prepareHeaders: (headers, { endpoint }) => {
    const token = authService.getAccessToken();
    
    // Debug: Log token status
    if (endpoint === 'users/profile') {
      console.log('🔑 [prepareHeaders] Token check for profile update:');
      console.log('  - Token exists:', !!token);
      console.log('  - Token value:', token ? `${token.substring(0, 20)}...` : 'null');
    }
    
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
      
      // Debug: Log header để xác nhận
      if (endpoint === 'users/profile') {
        console.log('  ✅ Authorization header SET:', `Bearer ${token.substring(0, 20)}...`);
        console.log('  📤 Header sẽ được gửi trong request');
      }
    } else {
      // Debug: Warn if no token
      if (endpoint === 'users/profile') {
        console.warn('  ⚠️ No access token found in localStorage!');
        console.warn('  ❌ Authorization header KHÔNG được set');
      }
    }
    
    return headers;
  },
});

/**
 * Helper function để extract message từ ApiResponse
 */
function extractMessage(response: ApiResponse<unknown>): {
  title: string;
  message: string;
  errors?: Record<string, string[]>;
} {
  // Normalize response - check both PascalCase and lowercase
  const title = response.Title || response.title || 'Thông báo';
  const detail = response.Detail || response.detail || '';
  const errors = response.Errors || response.errors || {};

  return {
    title,
    message: detail,
    errors: Object.keys(errors).length > 0 ? errors : undefined,
  };
}

/**
 * Helper function để normalize headers từ FetchArgs
 * Chuyển đổi headers từ các kiểu khác nhau thành Record<string, string>
 */
function normalizeHeaders(headers?: Headers | string[][] | Record<string, string | undefined>): Record<string, string> {
  if (!headers) {
    return {};
  }

  // Nếu là Headers object (Web API Headers)
  if (headers instanceof Headers) {
    const result: Record<string, string> = {};
    headers.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }

  // Nếu là array of arrays [["key", "value"], ...]
  if (Array.isArray(headers)) {
    const result: Record<string, string> = {};
    headers.forEach(([key, value]) => {
      if (key && value) {
        result[key] = value;
      }
    });
    return result;
  }

  // Nếu là Record<string, string | undefined>
  const result: Record<string, string> = {};
  Object.entries(headers).forEach(([key, value]) => {
    if (value !== undefined) {
      result[key] = value;
    }
  });
  return result;
}

/**
 * Helper function để format validation errors thành message
 */
function formatValidationErrors(errors: Record<string, string[]>): string {
  const errorMessages = Object.values(errors)
    .flat()
    .filter((msg) => msg && msg.trim().length > 0);

  if (errorMessages.length === 0) {
    return 'Thông tin không hợp lệ. Vui lòng kiểm tra lại.';
  }

  if (errorMessages.length === 1) {
    return errorMessages[0];
  }

  return errorMessages.slice(0, 3).join(', ') + (errorMessages.length > 3 ? '...' : '');
}

/**
 * Helper function để handle HTTP errors không có ApiResponse format
 */
function handleHttpError(status: number): void {
  if (status === 404) {
    showToast.error('Không tìm thấy', 'Không tìm thấy endpoint hoặc tài nguyên yêu cầu. Vui lòng kiểm tra lại URL.');
  } else if (status === 401) {
    showToast.error('Phiên đăng nhập đã hết hạn', 'Vui lòng đăng nhập lại.');
  } else if (status === 403) {
    showToast.error('Không có quyền truy cập', 'Bạn không có quyền thực hiện thao tác này.');
  } else if (status === 400) {
    showToast.error('Thông tin không hợp lệ', 'Vui lòng kiểm tra lại thông tin đã nhập.');
  } else if (status >= 500) {
    showToast.error('Lỗi hệ thống', 'Có lỗi xảy ra ở server. Vui lòng thử lại sau.');
  } else {
    showToast.error('Có lỗi xảy ra', `Lỗi ${status}. Vui lòng thử lại sau.`);
  }
}

/**
 * Helper function để show toast dựa trên response type
 */
function showResponseToast(
  response: ApiResponse<unknown>,
  defaultErrorTitle: string = 'Có lỗi xảy ra'
): void {
  const type = (response.Type || response.type || '').toUpperCase();
  const status = response.Status ?? response.status ?? 0;
  const { title, message, errors } = extractMessage(response);

  // Skip toast for success responses (components will handle them)
  // Only auto-show for errors
  if (type === ResponseType.SUCCESS || (status >= 200 && status < 300)) {
    // Success - components tự handle toast nếu cần
    return;
  }

  // Validation errors - show detailed message
  if (type === ResponseType.VALIDATION_FAILED || status === 400) {
    const errorMessage = errors ? formatValidationErrors(errors) : message;
    showToast.error(title || 'Thông tin không hợp lệ', errorMessage);
    return;
  }

  // Authentication errors
  if (type === ResponseType.UNAUTHORIZED || status === 401) {
    showToast.error(title || 'Phiên đăng nhập đã hết hạn', message || 'Vui lòng đăng nhập lại.');
    return;
  }

  // Forbidden errors
  if (type === ResponseType.FORBIDDEN || status === 403) {
    showToast.error(title || 'Không có quyền truy cập', message || 'Bạn không có quyền thực hiện thao tác này.');
    return;
  }

  // Not found errors
  if (type === ResponseType.NOT_FOUND || status === 404) {
    showToast.error(title || 'Không tìm thấy', message || 'Không tìm thấy thông tin yêu cầu.');
    return;
  }

  // Server errors
  if (
    type === ResponseType.INTERNAL_ERROR ||
    type === ResponseType.DATABASE_OPERATION_FAILED ||
    status >= 500
  ) {
    showToast.error(title || 'Lỗi hệ thống', message || 'Có lỗi xảy ra. Vui lòng thử lại sau.');
    return;
  }

  // Other errors
  showToast.error(title || defaultErrorTitle, message || 'Có lỗi xảy ra. Vui lòng thử lại.');
}

/**
 * BaseQuery với auto toast notification và auto-refresh token
 * 
 * MẶC ĐỊNH: Auto toast bị DISABLE để ưu tiên hiển thị lỗi từ code native (components)
 * 
 * Để enable auto toast, thêm meta trong query:
 * ```
 * query: (body) => ({
 *   url: 'endpoint',
 *   method: 'POST',
 *   body,
 * }),
 * meta: {
 *   enableToast: true, // Enable auto toast cho endpoint này
 * },
 * ```
 * 
 * Components nên tự handle errors bằng cách:
 * - Dùng getApiErrorMessage() từ @/features/common/common.type
 * - Dùng showToast từ @/lib/toast
 * 
 * AUTO-REFRESH TOKEN:
 * - Khi gặp lỗi 401, tự động gọi /auth/refresh-token
 * - Refresh token được đọc từ HttpOnly cookie (credentials: 'include')
 * - Access token cũ (dù đã hết hạn) vẫn được gửi trong Authorization header
 * - Sau khi refresh thành công, retry request ban đầu với token mới
 * - Sử dụng Mutex để tránh race condition: chỉ 1 request refresh chạy tại 1 thời điểm
 */
export const baseQueryWithToast: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Gọi API ban đầu
  let result = await baseQuery(args, api, extraOptions);

  // Check meta option để enable auto toast (mặc định là disabled)
  const fetchArgs = typeof args === 'string' ? { url: args } : args;
  const enableToast = (fetchArgs as any)?.meta?.enableToast === true;

  // AUTO-REFRESH TOKEN: Handle 401 Unauthorized errors
  if (result.error && typeof result.error.status === 'number' && result.error.status === 401) {
    const originalRequest = fetchArgs as FetchArgs;
    
    // Danh sách các auth endpoints không cần auto-refresh token
    // Vì khi login/signup, user chưa có token hợp lệ, 401 là lỗi bình thường
    const authEndpointsWithoutRefresh = [
      'auth/login',
      'auth/register',
      'auth/sign-in',
      'auth/sign-up',
      'auth/forgot-password',
      'auth/reset-password',
      'auth/verify-email',
      'auth/refresh-token', // Refresh token endpoint cũng không cần refresh lại
    ];
    
    // Kiểm tra xem request có phải là auth endpoint không cần refresh không
    const isAuthEndpoint = typeof originalRequest === 'object' && 
      originalRequest.url && 
      authEndpointsWithoutRefresh.some(endpoint => originalRequest.url?.includes(endpoint));
    
    if (isAuthEndpoint) {
      // Đối với auth endpoints, không cần refresh token
      // Chỉ redirect về login nếu là refresh-token request (token đã hết hạn hoàn toàn)
      if (typeof originalRequest === 'object' && originalRequest.url === 'auth/refresh-token') {
        authService.clearAuthData();
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/sign-in';
        }
      }
      // Với các auth endpoints khác (login, signup), chỉ return error, không refresh
      return result;
    }

    // Phân nhánh logic: Kiểm tra mutex trước khi quyết định refresh hay chỉ retry
    if (!mutex.isLocked()) {
      // TRƯỜNG HỢP 1: Chưa có ai refresh -> Mình lock và làm refresh
      const release = await mutex.acquire();
      
      try {
        // Call refresh token endpoint
        // Note: Empty body - refresh token comes from HttpOnly cookie
        // Expired access token is automatically sent in Authorization header via prepareHeaders
        const refreshResult = await baseQuery(
          {
            url: 'auth/refresh-token',
            method: 'POST',
            body: {}, // Empty body - refresh token is in cookie
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          const refreshResponse = refreshResult.data as ApiResponse<SignInResponseDataModel>;
          
          // Check if refresh was successful
          if (isApiResponseSuccess(refreshResponse)) {
            const { accessToken, expiresIn } = refreshResponse.data || refreshResponse.Data || {};
            
            if (accessToken) {
              // Save new access token
              authService.setAccessToken(accessToken);
              if (expiresIn) {
                authService.setTokenExpiry(expiresIn);
              }

              // Retry original request with new token
              // Normalize và merge headers với authorization mới
              const normalizedHeaders = typeof originalRequest === 'object' && originalRequest.headers
                ? normalizeHeaders(originalRequest.headers)
                : {};

              const retryRequest: FetchArgs = {
                ...originalRequest,
                headers: {
                  ...normalizedHeaders,
                  authorization: `Bearer ${accessToken}`,
                },
              };

              result = await baseQuery(retryRequest, api, extraOptions);
              // Sau khi refresh thành công và retry, return luôn kết quả
              return result;
            }
          }
        }

        // Nếu refresh thất bại -> Logout
        authService.clearAuthData();
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/sign-in';
        }
        return result;
      } catch (refreshError) {
        // Refresh failed - clear auth and redirect
        console.error('Token refresh failed:', refreshError);
        authService.clearAuthData();
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/sign-in';
        }
        return result;
      } finally {
        // Mở khóa mutex dù thành công hay thất bại
        release();
      }
    } else {
      // TRƯỜNG HỢP 2: Đang có người khác refresh -> Đợi họ xong rồi chỉ retry
      await mutex.waitForUnlock();
      
      // Sau khi đợi xong, token đã được refresh bởi request khác
      // Chỉ cần retry request ban đầu với token mới từ localStorage
      const currentToken = authService.getAccessToken();
      const normalizedHeaders = typeof originalRequest === 'object' && originalRequest.headers
        ? normalizeHeaders(originalRequest.headers)
        : {};

      const retryRequest: FetchArgs = {
        ...originalRequest,
        headers: {
          ...normalizedHeaders,
          authorization: currentToken ? `Bearer ${currentToken}` : undefined,
        },
      };

      result = await baseQuery(retryRequest, api, extraOptions);
    }
  }

  // Handle response - chỉ show toast nếu được enable
  if (result.data && enableToast) {
    const response = result.data as ApiResponse<unknown>;
    
    // Show toast for error responses
    if (response && typeof response === 'object') {
      const type = (response.Type || response.type || '').toUpperCase();
      const status = response.Status ?? response.status ?? 0;
      
      // Show toast cho errors:
      // - Status >= 400 (HTTP error)
      // - Status 200 nhưng type không phải SUCCESS (backend error trong response)
      const isError = status >= 400 || (type !== ResponseType.SUCCESS && type !== '');
      
      if (isError) {
        showResponseToast(response);
      }
    }
  }

  // Handle fetch errors - chỉ show toast nếu được enable
  if (result.error && enableToast) {
    const error = result.error as FetchBaseQueryError;
    
    // If error has data (backend error response with ApiResponse format)
    if (error.data && typeof error.data === 'object') {
      const errorResponse = error.data as ApiResponse<unknown>;
      
      // Check if it's ApiResponse format (has Type/type field)
      if ('Type' in errorResponse || 'type' in errorResponse) {
        showResponseToast(errorResponse);
      } else {
        // Not ApiResponse format, but still an error - show generic error
        const status = typeof error.status === 'number' ? error.status : 0;
        handleHttpError(status);
      }
    } else if (typeof error.status === 'number') {
      // HTTP error status (404, 500, etc.) without ApiResponse format
      handleHttpError(error.status);
    } else if (error.status === 'FETCH_ERROR' || error.status === 'PARSING_ERROR') {
      // Network error or parsing error
      showToast.error('Lỗi kết nối', 'Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.');
    } else {
      // Unknown error
      showToast.error('Có lỗi xảy ra', 'Vui lòng thử lại sau.');
    }
  }

  return result;
};
