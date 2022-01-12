import { createContext, FC, useContext } from "react";
import { useGetIsLogin } from "../api/auth/getIsLogin";
import { useGetUserProfile } from "../api/auth/getUserProfile";
import { LocalStorage } from "../entities/localstorage";

interface UserProfile {
  user: string;
  api_key: string;
  api_secret: string;
  access_token: string;
  investment: number;
  max_loss: number;
  max_profit: number;
  nifty_lot: number;
  banknifty_lot: number;
  is_accesstoken_valid: boolean;
  zerodha_last_login: string;
}

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
