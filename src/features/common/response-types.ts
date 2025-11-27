/**
 * API Response Types - Frontend Constants
 * 
 * File này chứa các constants cho response types từ backend API.
 * Frontend có thể import và sử dụng để xử lý response một cách nhất quán.
 * 
 * Được generate từ: Contract/Responses/ResponseType.cs
 */

/**
 * Định nghĩa các loại response type được sử dụng trong API
 */
export const ResponseType = {
    /** Response thành công (200) */
    SUCCESS: 'SUCCESS',
    
    /** Bad Request - Request không hợp lệ (400) */
    BAD_REQUEST: 'BAD_REQUEST',
    
    /** Validation Failed - Lỗi validation từ FluentValidation (400) */
    VALIDATION_FAILED: 'VALIDATION_FAILED',
    
    /** Unauthorized - Chưa xác thực (401) */
    UNAUTHORIZED: 'UNAUTHORIZED',
    
    /** Forbidden - Không có quyền truy cập (403) */
    FORBIDDEN: 'FORBIDDEN',
    
    /** Not Found - Không tìm thấy resource (404) */
    NOT_FOUND: 'NOT_FOUND',
    
    /** Conflict - Xung đột dữ liệu (409) */
    CONFLICT: 'CONFLICT',
    
    /** Too Many Request - Quá nhiều request (429) */
    TOO_MANY_REQUEST: 'TOO_MANY_REQUEST',
    
    /** Database Operation Failed - Lỗi database (500) */
    DATABASE_OPERATION_FAILED: 'DATABASE_OPERATION_FAILED',
    
    /** Internal Error - Lỗi server không xác định (500) */
    INTERNAL_ERROR: 'INTERNAL_ERROR',
  } as const;
  
  /**
   * Định nghĩa các title mặc định cho response
   */
  export const ResponseTitle = {
    SUCCESS: 'Success',
    BAD_REQUEST: 'Bad Request',
    VALIDATION_FAILED: 'Validation Failed',
    UNAUTHORIZED: 'Unauthorized',
    FORBIDDEN: 'Forbidden',
    NOT_FOUND: 'Not Found',
    CONFLICT: 'Conflict',
    TOO_MANY_REQUEST: 'Too Many Request',
    DATABASE_OPERATION_FAILED: 'Database operation failed',
    INTERNAL_ERROR: 'Unexpected Error',
  } as const;
  
  /**
   * Type cho ResponseType values
   */
  export type ResponseTypeValue = typeof ResponseType[keyof typeof ResponseType];
  
  /**
   * Helper function để kiểm tra response type
   */
  export const isResponseType = (
    response: { type?: string; Type?: string },
    type: ResponseTypeValue
  ): boolean => {
    const responseType = (response.type || response.Type || '').toUpperCase();
    return responseType === type.toUpperCase();
  };
  
  /**
   * Helper function để kiểm tra response thành công
   */
  export const isSuccessResponse = (response: { type?: string; Type?: string }): boolean => {
    return isResponseType(response, ResponseType.SUCCESS);
  };
  
  /**
   * Helper function để kiểm tra response lỗi validation
   */
  export const isValidationError = (response: { type?: string; Type?: string }): boolean => {
    return isResponseType(response, ResponseType.VALIDATION_FAILED);
  };
  
  /**
   * Helper function để kiểm tra response lỗi authentication
   */
  export const isAuthError = (response: { type?: string; Type?: string }): boolean => {
    return (
      isResponseType(response, ResponseType.UNAUTHORIZED) ||
      isResponseType(response, ResponseType.FORBIDDEN)
    );
  };
  
  /**
   * Helper function để kiểm tra response lỗi server
   */
  export const isServerError = (response: { type?: string; Type?: string }): boolean => {
    return (
      isResponseType(response, ResponseType.DATABASE_OPERATION_FAILED) ||
      isResponseType(response, ResponseType.INTERNAL_ERROR)
    );
  };
  
  