import { createContext, FC, useContext } from "react";
import { useGetIsLogin } from "../api/auth/getIsLogin";
import { useGetUserProfile } from "../api/auth/getUserProfile";
import { useGetMargins } from "../api/zerodha/getMargins";
import { useGetPnl } from "../api/zerodha/getPnl";
import { useGetPositions } from "../api/zerodha/getPositions";
import { LocalStorage } from "../entities/localstorage";
import { IMargins, IPositions } from "../types/kite";
import { UserProfile } from "../types/user";

interface IAuthenticationContext {
  isAuthenticated: boolean;
  isAuthenticatedLoading: boolean;
  logoutUser: () => void;
  profile?: UserProfile;
  isGetUserProfileError: boolean;
  margins?: IMargins;
  positions?: IPositions;
  pnl?: number;
}

export const AuthenticationContext = createContext<IAuthenticationContext>(
  {} as any
);

export const AuthProvider: FC = ({ children }) => {
  const { data: userProfile, isError: isGetUserProfileError } =
    useGetUserProfile();
  const { isSuccess: isAuthenticated, isLoading: isAuthenticatedLoading } =
    useGetIsLogin();
  const { data: margins } = useGetMargins();
  const { data: positions } = useGetPositions();
  const { data: pnl } = useGetPnl();

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
        margins,
        positions,
        pnl: pnl?.pnl,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuth = () => useContext(AuthenticationContext);
