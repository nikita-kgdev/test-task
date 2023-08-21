"use client"
import { createContext, FC, ReactNode, useContext } from "react";
import { User } from "@src/shared/interfaces/user";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "@src/frontend/common/services/api/user";
import { getAuth } from "@src/frontend/common/services/auth";

const AuthContext = createContext<{ user: User | null; refresh: () => void }>({
  user: null,
  refresh: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data, refetch } = useQuery(["user"], getMe, {
    enabled: !!getAuth(),
  });

  return (
    <AuthContext.Provider
      value={{
        user: data?.user ?? null,
        refresh: () => {
          refetch()
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
