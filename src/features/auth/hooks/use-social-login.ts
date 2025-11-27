import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { useGoogleLogin } from '@react-oauth/google';
import { socialLoginService } from '@/features/auth/services/social-login.service';
import { useSocialSignInMutation } from '@/features/auth/auth.slice';
import { SocialProvider } from '@/features/auth/auth.type';
import { isApiResponseSuccess, getApiErrorMessage } from '@/features/common/common.type';
import { authService } from '@/features/auth/auth.service';
import { useLoading } from '@/contexts/loading-context';

interface UseSocialLoginOptions {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function useSocialLogin(options?: UseSocialLoginOptions) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { startLoading, stopLoading } = useLoading();
  const [socialSignIn] = useSocialSignInMutation();
  const facebookInitializedRef = useRef(false);

  // Hàm xử lý chung sau khi có Token từ Google hoặc Facebook
  const handleSocialLogin = useCallback(
    async (accessToken: string, provider: SocialProvider) => {
      setIsLoading(true);
      const providerName = provider === SocialProvider.Google ? 'Google' : 'Facebook';
      startLoading(t('auth.socialLogin.loading') || `Đang đăng nhập với ${providerName}...`);
      try {
        // Gọi API Backend của bạn
        const response = await socialSignIn({
          AccessToken: accessToken,
          Provider: provider,
        }).unwrap();

        if (isApiResponseSuccess(response)) {
          // Log debug (Development only)
          if (import.meta.env.DEV) {
            console.log(`=== ${provider} LOGIN SUCCESS ===`, response);
          }

          // Lưu thông tin đăng nhập
          const responseData = response.Data || response.data;
          if (responseData) {
            authService.saveAuthData(responseData);
          }

          toast.success(
            t('auth.socialLogin.successTitle') || 'Đăng nhập thành công!',
            {
              description: t('auth.socialLogin.successMessage') || 'Chào mừng bạn trở lại!',
            }
          );

          if (options?.onSuccess) {
            options.onSuccess();
          } else {
            navigate('/home');
          }
        } else {
          // Xử lý khi API trả về lỗi logic (nhưng vẫn 200 OK)
          const errorMessage = getApiErrorMessage(response);
          throw new Error(errorMessage);
        }
      } catch (error: any) {
        // Log debug
        if (import.meta.env.DEV) {
          console.error(`=== ${provider} LOGIN ERROR ===`, error);
        }

        let errorMessage = t('auth.socialLogin.errorMessage') || 'Có lỗi xảy ra.';

        // Phân tích lỗi từ RTK Query hoặc API
        if (error?.data) {
          errorMessage = getApiErrorMessage(error.data);
        } else if (error?.message) {
          errorMessage = error.message;
        } else if (error?.status === 401) {
          errorMessage = 'Xác thực thất bại (401). Vui lòng kiểm tra lại cấu hình.';
        }

        toast.error(
          t('auth.socialLogin.errorTitle') || 'Đăng nhập thất bại',
          { description: errorMessage }
        );

        if (options?.onError) {
          options.onError(errorMessage);
        }
      } finally {
        setIsLoading(false);
        stopLoading();
      }
    },
    [socialSignIn, navigate, t, options, startLoading, stopLoading]
  );

  // --- CẤU HÌNH GOOGLE LOGIN ---
  const googleLoginHook = useGoogleLogin({
    // QUAN TRỌNG: Không dùng flow: 'auth-code'.
    // Mặc định là 'implicit' sẽ trả về Access Token.
    onSuccess: (tokenResponse) => {
      // tokenResponse chứa access_token
      handleSocialLogin(tokenResponse.access_token, SocialProvider.Google);
    },
    onError: (error) => {
      console.error('Google Login SDK Error:', error);
      stopLoading();
      toast.error('Không thể kết nối với Google.');
      if (options?.onError) {
        options.onError('Google login failed');
      }
    },
  });

  const handleGoogleLogin = useCallback(() => {
    googleLoginHook();
  }, [googleLoginHook]);

  // --- CẤU HÌNH FACEBOOK LOGIN ---
  const handleFacebookLogin = useCallback(async () => {
    try {
      if (!socialLoginService.isFacebookLoaded()) {
        toast.error('Facebook SDK chưa sẵn sàng. Hãy tải lại trang.');
        return;
      }

      const facebookAppId = import.meta.env.VITE_FACEBOOK_APP_ID;
      if (!facebookAppId) {
        toast.error('Thiếu cấu hình Facebook App ID.');
        return;
      }

      // Chỉ khởi tạo 1 lần
      if (!facebookInitializedRef.current) {
        socialLoginService.initialize({ facebookAppId });
        await socialLoginService.initializeFacebook();
        facebookInitializedRef.current = true;
      }

      const accessToken = await socialLoginService.signInWithFacebook();
      await handleSocialLogin(accessToken, SocialProvider.Facebook);
    } catch (error: any) {
      console.error('Facebook Login Error:', error);
      stopLoading();
      toast.error('Lỗi đăng nhập Facebook', {
        description: error.message || 'Vui lòng thử lại sau.',
      });
      if (options?.onError) {
        options.onError(error.message || 'Facebook login failed');
      }
    }
  }, [handleSocialLogin, stopLoading, options]);

  return {
    handleGoogleLogin,
    handleFacebookLogin,
    isLoading,
  };
}

