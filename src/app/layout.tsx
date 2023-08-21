import { ToastContainer } from "react-toastify";
import "@src/frontend/styles/global.css";
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from "@src/frontend/common/context/AuthContext";
import { ReactNode } from 'react';
import {QueryProvider} from '@src/frontend/common/provider/QueryProvider';

export default function MyApp({ children }: { children:ReactNode }) {
  return (
      <html>
      <head>
          <title>Test app</title>
      </head>
      <body><QueryProvider>
          <AuthContextProvider>
              {children}
              <ToastContainer/>
          </AuthContextProvider>
      </QueryProvider></body>
      </html>
  );
}
