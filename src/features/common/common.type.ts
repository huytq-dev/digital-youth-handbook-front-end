export interface ApiResponse<T = unknown> {
    Type?: string;
    type?: string; // Backend có thể trả về lowercase
    Title?: string;
    title?: string; // Backend có thể trả về lowercase
    Status?: number;
    status?: number; // Backend có thể trả về lowercase
    Detail?: string;
    detail?: string; // Backend có thể trả về lowercase
    Errors?: Record<string, string[]>;
    errors?: Record<string, string[]>; // Backend có thể trả về lowercase
    Data?: T | null;
    data?: T | null; // Backend có thể trả về lowercase
  }
  
  export function apiResponseOk<T = unknown>(message: string): ApiResponse<T> {
    return {
      Type: 'SUCCESS',
      Title: 'Success',
      Status: 200,
      Detail: message,
      Errors: {},
      Data: null,
    };
  }
  
  export function apiResponseOkWithData<T>(
    data: T,
    detail: string = 'Success'
  ): ApiResponse<T> {
    return {
      Type: 'SUCCESS',
      Title: 'Success',
      Status: 200,
      Detail: detail,
      Errors: {},
      Data: data,
    };
  }
  
  export function apiResponseError<T = unknown>(
    type: string,
    title: string,
    status: number,
    detail: string,
    errors?: Record<string, string[]>
  ): ApiResponse<T> {
    return {
      Type: type,
      Title: title,
      Status: status,
      Detail: detail,
      Errors: errors || {},
      Data: null,
    };
  }
  
  export function isApiResponseSuccess<T>(
    response: ApiResponse<T>
  ): response is ApiResponse<T> & { Data: T } {
    // Normalize response - check both PascalCase and lowercase
    // Backend sử dụng lowercase keys: type, status, errors, data
    const type = (response.Type || response.type || '').toUpperCase();
    const status = response.Status ?? response.status ?? 0;
    const errors = response.Errors || response.errors || {};
    
    // Priority 1: Check type field first (the most reliable indicator)
    // Backend trả về type = 'SUCCESS' khi thành công
    const isSuccessType = type === 'SUCCESS';
    
    // Priority 2: If status >= 400, it's always an error regardless of Type
    if (status >= 400) {
      return false;
    }
    
    // Priority 3: If type is SUCCESS and status is 2xx → Success
    const isSuccessStatus = status >= 200 && status < 300;
    if (isSuccessType && isSuccessStatus) {
      return true;
    }
    
    // Fallback: Status is 2xx AND no errors (for backward compatibility)
    // Nhưng ưu tiên check type trước
    const hasNoErrors = !errors || (typeof errors === 'object' && Object.keys(errors).length === 0);
    return isSuccessStatus && hasNoErrors;
  }
  
  export function isApiResponseError<T>(
    response: ApiResponse<T>
  ): boolean {
    const type = response.Type || response.type || '';
    const status = response.Status ?? response.status ?? 0;
    return type.toUpperCase() !== 'SUCCESS' || status >= 400;
  }
  
  export function getApiErrorMessage<T>(response: ApiResponse<T> | null | undefined): string {
    // Handle null or undefined response
    if (!response || typeof response !== 'object') {
      return 'Có lỗi xảy ra. Vui lòng thử lại sau.';
    }
  
    // Normalize - check both PascalCase and lowercase (backend sử dụng lowercase)
    const detail = response.Detail || response.detail;
    const title = response.Title || response.title;
    const errors = response.Errors || response.errors;
    const status = response.Status ?? response.status ?? 0;
    const type = (response.Type || response.type || '').toUpperCase();
  
    // Map technical error types to generic user-friendly messages (không leak thông tin)
    // Security: Generic messages để tránh information disclosure
    const errorTypeMap: Record<string, string> = {
      'BAD_REQUEST': 'Thông tin không hợp lệ. Vui lòng kiểm tra lại.',
      'VALIDATION_FAILED': 'Thông tin không hợp lệ. Vui lòng kiểm tra lại.',
      'UNAUTHORIZED': 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
      'FORBIDDEN': 'Bạn không có quyền thực hiện thao tác này.',
      'NOT_FOUND': 'Không tìm thấy thông tin.',
      'CONFLICT': 'Thông tin đã tồn tại. Vui lòng thử lại.',
      'TOO_MANY_REQUEST': 'Quá nhiều yêu cầu. Vui lòng thử lại sau.',
      'DATABASE_OPERATION_FAILED': 'Lỗi hệ thống. Vui lòng thử lại sau.',
      'INTERNAL_ERROR': 'Lỗi hệ thống. Vui lòng thử lại sau.',
    };
  
    // Priority 1: Check if we have a mapped error type
    if (type && errorTypeMap[type]) {
      return errorTypeMap[type];
    }
  
    // Priority 2: Check if response has Detail property
    // Security: Sanitize detail để tránh leak thông tin nhạy cảm
    if (detail) {
      const detailLower = detail.toLowerCase();
      // Loại bỏ các thông tin kỹ thuật có thể leak thông tin về hệ thống
      if (
        detailLower.includes('database') ||
        detailLower.includes('sql') ||
        detailLower.includes('constraint') ||
        detailLower.includes('foreign key') ||
        detailLower.includes('primary key') ||
        detailLower.includes('unique') ||
        detailLower.includes('duplicate') ||
        detailLower.includes('violation') ||
        detailLower.includes('exception') ||
        detailLower.includes('stack trace') ||
        detailLower.includes('at ') ||
        detailLower.includes('file:') ||
        detailLower.includes('line:')
      ) {
        return 'Lỗi hệ thống. Vui lòng thử lại sau.';
      }
      // Chỉ hiển thị detail nếu nó là message thân thiện với user
      // Nếu có vẻ như là technical message, generic hóa nó
      if (detail.length > 200) {
        // Message quá dài có thể chứa stack trace hoặc technical info
        return 'Lỗi hệ thống. Vui lòng thử lại sau.';
      }
      return detail;
    }
    
    // Priority 3: Safely check Errors property (validation errors)
    // Security: Chỉ hiển thị validation errors generic, không leak field names cụ thể
    if (errors && typeof errors === 'object') {
      const errorKeys = Object.keys(errors);
      if (errorKeys.length > 0) {
        const firstError = Object.values(errors)[0];
        if (Array.isArray(firstError) && firstError.length > 0) {
          const errorMsg = firstError[0];
          // Sanitize: Loại bỏ thông tin về field names hoặc technical details
          if (
            typeof errorMsg === 'string' &&
            (errorMsg.toLowerCase().includes('field') ||
              errorMsg.toLowerCase().includes('column') ||
              errorMsg.toLowerCase().includes('table') ||
              errorMsg.toLowerCase().includes('database'))
          ) {
            return 'Thông tin không hợp lệ. Vui lòng kiểm tra lại.';
          }
          return errorMsg;
        }
      }
    }
    
    // Priority 4: Map status codes to user-friendly messages
    if (status >= 500) {
      return 'Lỗi hệ thống. Vui lòng thử lại sau.';
    } else if (status === 400) {
      return 'Thông tin không hợp lệ. Vui lòng kiểm tra lại.';
    } else if (status === 401 || status === 403) {
      return 'Không có quyền truy cập.';
    } else if (status === 404) {
      return 'Không tìm thấy thông tin.';
    }
    
    // Fallback to Title or default message
    return title || 'Có lỗi xảy ra. Vui lòng thử lại sau.';
  }
  
  export type ApiReponseSuccess<T> = ApiResponse<T> & { Data: T };
  
  export type RoleName = 'ADMIN' | 'USER' | 'DRIVER';
  
  // Gender type (re-export từ auth.type.ts để dùng chung)
  // Backend enum: Male = 1, Female = 2, Other = 3
  export type GenderType = 1 | 2 | 3; // 1=Nam, 2=Nữ, 3=Khác
  
  /**
   * UserDomainModel - Model chính cho user trong app
   * Option 2 (Recommended): Bao gồm đầy đủ thông tin cho Header và Profile page
   * Match với GetCurrentUserResponseDataModel từ API /api/auth/me
   */
  export interface UserDomainModel {
    // Bắt buộc
    id: string;  // Match với backend response "id"
    name: string;
    email: string;
    username?: string;              // Username for login
    
    // Optional nhưng recommended
    picture?: string | null;        // URL ảnh avatar - cho Header
    isVerified: boolean;            // Cho verified badge
    roleName: RoleName;             // Cho authorization
    
    // Optional - cho Profile page
    gender?: GenderType | null;
    dob?: string | null;            // ISO 8601 date string
    address?: string | null;
    
    // Thông tin trường/lớp
    schoolName?: string | null;     // Tên trường
    className?: string | null;      // Tên lớp
  }