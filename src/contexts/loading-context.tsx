import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface LoadingContextValue {
  loading: boolean;
  message: string | null;
  setLoading: (value: boolean) => void;
  startLoading: (message?: string) => void;
  stopLoading: () => void;
}

const LoadingContext = createContext<LoadingContextValue | undefined>(
  undefined,
);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const startLoading = (loadingMessage?: string) => {
    setLoading(true);
    if (loadingMessage) {
      setMessage(loadingMessage);
    }
  };

  const stopLoading = () => {
    setLoading(false);
    setMessage(null);
  };

  return (
    <LoadingContext.Provider
      value={{
        loading,
        message,
        setLoading,
        startLoading,
        stopLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const ctx = useContext(LoadingContext);
  if (!ctx) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return ctx;
};


