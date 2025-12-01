import { toast } from "sonner";

/**
 * Toast utility functions
 * Wrapper around sonner để dễ sử dụng
 */
export const showToast = {
  success: (title: string, description?: string) => {
    toast.success(title, {
      description,
      duration: 5000,
    });
  },

  error: (title: string, description?: string) => {
    toast.error(title, {
      description,
      duration: 5000,
    });
  },

  info: (title: string, description?: string) => {
    toast.info(title, {
      description,
      duration: 5000,
    });
  },
};

