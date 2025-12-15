import { z } from "zod";

// URL validation regex - phải bắt đầu với http:// hoặc https://
const urlRegex = /^https?:\/\/.+/i;

/**
 * Helper function để kiểm tra string có giá trị hay không
 * (không phải null, undefined, hoặc empty/whitespace)
 */
const hasValue = (val: string | null | undefined): boolean => {
  if (val === null || val === undefined) return false;
  if (typeof val !== 'string') return false;
  return val.trim().length > 0;
};

/**
 * Update User Profile Schema
 * Tất cả fields đều optional - chỉ validate khi có giá trị
 */
export const updateUserProfileSchema = z.object({
  // Name: optional, nếu có thì min 2, max 100 ký tự
  name: z
    .string()
    .nullable()
    .optional()
    .refine(
      (val) => {
        // Nếu null, undefined, hoặc empty string → bỏ qua validation
        if (!hasValue(val)) return true;
        // Nếu có giá trị → validate
        const trimmed = val!.trim();
        return trimmed.length >= 2 && trimmed.length <= 100;
      },
      {
        message: "Họ và tên phải có từ 2 đến 100 ký tự",
      }
    ),

  // DOB: optional, nếu có thì phải < ngày hiện tại và > 120 năm trước
  dob: z
    .string()
    .nullable()
    .optional()
    .refine(
      (val) => {
        // Nếu null, undefined, hoặc empty string → bỏ qua validation
        if (!hasValue(val)) return true;

        try {
          const date = new Date(val!);
          const now = new Date();
          const maxAge = new Date();
          maxAge.setFullYear(maxAge.getFullYear() - 120);

          // Kiểm tra date hợp lệ
          if (isNaN(date.getTime())) return false;

          // Phải < ngày hiện tại (không cho phép ngày tương lai)
          if (date >= now) return false;

          // Phải > 120 năm trước (giới hạn tuổi tối đa 120)
          if (date < maxAge) return false;

          return true;
        } catch {
          return false;
        }
      },
      {
        message:
          "Ngày sinh phải hợp lệ, không được là ngày tương lai và không quá 120 năm trước",
      }
    ),

  // Gender: optional, nếu có thì phải là 1, 2, hoặc 3 (Backend: Male=1, Female=2, Other=3)
  gender: z
    .union([z.literal(1), z.literal(2), z.literal(3), z.null()])
    .optional()
    .refine(
      (val) => {
        // Nếu null hoặc undefined → bỏ qua validation
        if (val === null || val === undefined) return true;
        // Nếu có giá trị → phải là 1, 2, hoặc 3
        return val === 1 || val === 2 || val === 3;
      },
      {
        message: "Giới tính phải là Nam (1), Nữ (2), hoặc Khác (3)",
      }
    ),

  // Address: optional, nếu có thì max 255 ký tự
  address: z
    .string()
    .nullable()
    .optional()
    .refine(
      (val) => {
        // Nếu null, undefined, hoặc empty string → bỏ qua validation
        if (!hasValue(val)) return true;
        // Nếu có giá trị → validate
        return val!.trim().length <= 255;
      },
      {
        message: "Địa chỉ không được vượt quá 255 ký tự",
      }
    ),

  // PictureUrl: optional, nếu có thì phải là URL hợp lệ
  pictureUrl: z
    .string()
    .nullable()
    .optional()
    .refine(
      (val) => {
        // Nếu null, undefined, hoặc empty string → bỏ qua validation
        if (!hasValue(val)) return true;

        const trimmed = val!.trim();

        // Kiểm tra max length
        if (trimmed.length > 500) return false;

        // Bỏ qua validation cho blob URL (tạm thời cho preview)
        if (trimmed.startsWith('blob:')) return true;

        // Kiểm tra URL format (phải bắt đầu với http:// hoặc https://)
        return urlRegex.test(trimmed);
      },
      {
        message:
          "URL ảnh đại diện phải là URL hợp lệ (bắt đầu với http:// hoặc https://) và không quá 500 ký tự",
      }
    ),

  // SchoolName: optional, nếu có thì max 200 ký tự
  schoolName: z
    .string()
    .nullable()
    .optional()
    .refine(
      (val) => {
        if (!hasValue(val)) return true;
        return val!.trim().length <= 100;
      },
      {
        message: "Tên trường không được vượt quá 100 ký tự",
      }
    ),

  // ClassName: optional, nếu có thì max 50 ký tự
  className: z
    .string()
    .nullable()
    .optional()
    .refine(
      (val) => {
        if (!hasValue(val)) return true;
        return val!.trim().length <= 10;
      },
      {
        message: "Tên lớp không được vượt quá 10 ký tự",
      }
    ),
});

export type UpdateUserProfileFormData = z.infer<
  typeof updateUserProfileSchema
>;
