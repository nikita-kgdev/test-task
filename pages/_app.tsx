import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "../src/styles/global.css";
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from "@src/shared/context/AuthContext";

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
