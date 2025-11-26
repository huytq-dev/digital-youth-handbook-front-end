import type { ReactNode } from "react";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
// import { GoogleOAuthProvider } from "@react-oauth/google";

import { store } from "@/redux/store";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { LoadingProvider } from "@/contexts/loading-context";
// import { googleClientId } from "@/config";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* <GoogleOAuthProvider clientId={googleClientId}> */}
          <ThemeProvider defaultTheme="light" storageKey="digi-transport-theme">
            <LoadingProvider>
              {children}
              <Toaster />
            </LoadingProvider>
          </ThemeProvider>
        {/* </GoogleOAuthProvider> */}
      </BrowserRouter>
    </Provider>
  );
};


