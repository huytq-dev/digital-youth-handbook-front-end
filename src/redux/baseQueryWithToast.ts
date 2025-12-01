import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '@/config';
import { authService } from '@/features/auth/auth.service';
import type { ApiResponse } from '@/features/common/common.type';
import { ResponseType } from '@/features/common/response-types';
import { showToast } from '@/lib/toast';

/**
 * Custom baseQuery với auto toast notification
 * Tự động bắt và hiển thị message từ backend API response
 */
const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers) => {
    const token = authService.getAccessToken();
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
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
 * BaseQuery với auto toast notification
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
 */
export const baseQueryWithToast: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  // Check meta option để enable auto toast (mặc định là disabled)
  const fetchArgs = typeof args === 'string' ? { url: args } : args;
  const enableToast = (fetchArgs as any)?.meta?.enableToast === true;

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
