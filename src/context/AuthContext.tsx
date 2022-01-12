import { createContext, FC, useContext } from "react";
import { useGetIsLogin } from "../api/auth/getIsLogin";
import { useGetUserProfile } from "../api/auth/getUserProfile";
import { LocalStorage } from "../entities/localstorage";
import { UserProfile } from "../types/user";

interface IAuthenticationContext {
  isAuthenticated: boolean;
  isAuthenticatedLoading: boolean;
  logoutUser: () => void;
  profile?: UserProfile;
  isGetUserProfileError: boolean;
}

export const AuthenticationContext = createContext<IAuthenticationContext>(
  {} as any
);

export const AuthProvider: FC = ({ children }) => {
  const { data: userProfile, isError: isGetUserProfileError } =
    useGetUserProfile();
  const { isSuccess: isAuthenticated, isLoading: isAuthenticatedLoading } =
    useGetIsLogin();

  const logoutUser = () => {
    LocalStorage.clearAuthToken();
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated,
        profile: userProfile,
        logoutUser,
        isAuthenticatedLoading,
        isGetUserProfileError,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuth = () => useContext(AuthenticationContext);
