/**
 * Social Login Service
 * Handles Google and Facebook authentication using their respective SDKs
 */

declare global {
    interface Window {
      google?: {
        accounts: {
          id: {
            initialize: (config: GoogleIdConfiguration) => void;
            prompt: (callback?: (notification: PromptMomentNotification) => void) => void;
            renderButton: (parent: HTMLElement, config: GsiButtonConfiguration) => void;
          };
        };
      };
      FB?: {
        init: (config: FacebookInitParams) => void;
        login: (callback: (response: FacebookLoginResponse) => void, options?: FacebookLoginOptions) => void;
        getLoginStatus: (callback: (response: FacebookLoginStatusResponse) => void) => void;
      };
    }
  }
  
  // Google Types
  interface GoogleIdConfiguration {
    client_id: string;
    callback: (response: GoogleCredentialResponse) => void;
    auto_select?: boolean;
    cancel_on_tap_outside?: boolean;
  }
  
  interface GoogleCredentialResponse {
    credential: string; // This is the ID token
    select_by: string;
  }
  
  interface GsiButtonConfiguration {
    type: 'standard' | 'icon';
    theme?: 'outline' | 'filled_blue' | 'filled_black';
    size?: 'large' | 'medium' | 'small';
    text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
    shape?: 'rectangular' | 'pill' | 'circle' | 'square';
    logo_alignment?: 'left' | 'center';
    width?: string;
    locale?: string;
  }
  
  interface PromptMomentNotification {
    isNotDisplayed: () => boolean;
    isSkippedMoment: () => boolean;
    isDismissedMoment: () => boolean;
    getNotDisplayedReason: () => string;
    getSkippedReason: () => string;
    getDismissedReason: () => string;
    getMomentType: () => string;
  }
  
  // Facebook Types
  interface FacebookInitParams {
    appId: string;
    cookie?: boolean;
    xfbml?: boolean;
    version: string;
  }
  
  interface FacebookLoginResponse {
    authResponse?: {
      accessToken: string;
      expiresIn: number;
      signedRequest: string;
      userID: string;
    };
    status: 'connected' | 'not_authorized' | 'unknown';
  }
  
  interface FacebookLoginOptions {
    scope?: string;
    return_scopes?: boolean;
    enable_profile_selector?: boolean;
    auth_type?: 'rerequest' | 'reauthenticate';
  }
  
  interface FacebookLoginStatusResponse {
    status: 'connected' | 'not_authorized' | 'unknown';
    authResponse?: {
      accessToken: string;
      expiresIn: number;
      signedRequest: string;
      userID: string;
    };
  }
  
  export interface SocialLoginConfig {
    googleClientId?: string;
    facebookAppId?: string;
  }
  
  class SocialLoginService {
    private googleClientId?: string;
    private facebookAppId?: string;
    private googleInitialized = false;
    private facebookInitialized = false;
  
    /**
     * Initialize the service with configuration
     */
    initialize(config: SocialLoginConfig): void {
      this.googleClientId = config.googleClientId;
      this.facebookAppId = config.facebookAppId;
    }
  
    /**
     * Check if Google SDK is loaded
     */
    isGoogleLoaded(): boolean {
      return typeof window !== 'undefined' && typeof window.google !== 'undefined';
    }
  
    /**
     * Check if Facebook SDK is loaded
     */
    isFacebookLoaded(): boolean {
      return typeof window !== 'undefined' && typeof window.FB !== 'undefined';
    }
  
    /**
     * Initialize Google Sign-In
     */
    initializeGoogle(callback: (idToken: string) => void): Promise<void> {
      return new Promise((resolve, reject) => {
        if (!this.googleClientId) {
          reject(new Error('Google Client ID is not configured'));
          return;
        }
  
        if (this.googleInitialized) {
          resolve();
          return;
        }
  
        if (!this.isGoogleLoaded()) {
          reject(new Error('Google SDK is not loaded. Please ensure the script is included in index.html'));
          return;
        }
  
        try {
          window.google!.accounts.id.initialize({
            client_id: this.googleClientId,
            callback: (response: GoogleCredentialResponse) => {
              callback(response.credential);
            },
            auto_select: false,
            cancel_on_tap_outside: true,
          });
          this.googleInitialized = true;
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    }
  
  
    /**
     * Render Google Sign-In button
     */
    renderGoogleButton(
      elementId: string,
      callback: (idToken: string) => void
    ): void {
      if (!this.googleClientId) {
        throw new Error('Google Client ID is not configured');
      }
  
      if (!this.isGoogleLoaded()) {
        throw new Error('Google SDK is not loaded');
      }
  
      // Initialize if not already done
      if (!this.googleInitialized) {
        this.initializeGoogle(callback);
      }
  
      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error(`Element with id "${elementId}" not found`);
      }
  
      // Clear existing content
      element.innerHTML = '';
  
      // Render Google button
      window.google!.accounts.id.renderButton(element, {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        text: 'signin_with',
        width: '100%',
      });
    }
  
    /**
     * Trigger Google Sign-In programmatically
     */
    triggerGoogleSignIn(callback: (idToken: string) => void): void {
      if (!this.googleClientId) {
        throw new Error('Google Client ID is not configured');
      }
  
      if (!this.isGoogleLoaded()) {
        throw new Error('Google SDK is not loaded');
      }
  
      // Initialize if not already done
      if (!this.googleInitialized) {
        this.initializeGoogle(callback);
      }
  
      // Trigger One Tap prompt
      window.google!.accounts.id.prompt();
    }
  
    /**
     * Initialize Facebook SDK
     */
    initializeFacebook(): Promise<void> {
      return new Promise((resolve, reject) => {
        if (!this.facebookAppId) {
          reject(new Error('Facebook App ID is not configured'));
          return;
        }
  
        if (this.facebookInitialized) {
          resolve();
          return;
        }
  
        if (!this.isFacebookLoaded()) {
          reject(new Error('Facebook SDK is not loaded. Please ensure the script is included in index.html'));
          return;
        }
  
        try {
          window.FB!.init({
            appId: this.facebookAppId,
            cookie: true,
            xfbml: true,
            version: 'v21.0',
          });
          this.facebookInitialized = true;
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    }
  
    /**
     * Sign in with Facebook
     */
    async signInWithFacebook(): Promise<string> {
      if (!this.facebookAppId) {
        throw new Error('Facebook App ID is not configured');
      }
  
      if (!this.isFacebookLoaded()) {
        throw new Error('Facebook SDK is not loaded');
      }
  
      if (!this.facebookInitialized) {
        await this.initializeFacebook();
      }
  
      return new Promise((resolve, reject) => {
        try {
          window.FB!.login(
            (response: FacebookLoginResponse) => {
              if (response.authResponse && response.authResponse.accessToken) {
                resolve(response.authResponse.accessToken);
              } else {
                reject(new Error('Facebook login failed or was cancelled'));
              }
            },
            {
              scope: 'email,public_profile',
              return_scopes: true,
            }
          );
        } catch (error) {
          reject(error);
        }
      });
    }
  }
  
  export const socialLoginService = new SocialLoginService();
  
  