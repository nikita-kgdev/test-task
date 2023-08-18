import { createContext, FC, ReactNode, useContext, useEffect } from "react";
import { User } from "@src/shared/interfaces/user";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "@src/shared/services/api/user";
import { getAuth } from "@src/shared/services/auth";

const AuthContext = createContext<{ user: User | null; refresh: () => void }>({
  user: null,
  refresh: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { isInitialLoading, data, refetch } = useQuery(["user"], getMe, {
    enabled: !!getAuth(),
  });
    useEffect(() => {
        console.log("AuthContextProvider")
    }, [])
  // if (isInitialLoading) {
  //   return <></>;
  // }

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
