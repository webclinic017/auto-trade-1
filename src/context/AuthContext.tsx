import { createContext, FC, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetIsLogin } from "../api/auth/getIsLogin";
import { useGetUserProfile } from "../api/auth/getUserProfile";
import { useGetMargins } from "../api/zerodha/getMargins";
import { useGetPnl } from "../api/zerodha/getPnl";
import { useGetPositions } from "../api/zerodha/getPositions";
import { LocalStorage } from "../entities/localstorage";
import { IMargins, IPositions } from "../types/kite";
import { UserProfile } from "../types/user";
import { toggle_trader } from "../redux/features/trade/tradeSlice";

interface IAuthenticationContext {
  isAuthenticated: boolean;
  isAuthenticatedLoading: boolean;
  logoutUser: () => void;
  profile?: UserProfile;
  isGetUserProfileError: boolean;
  margins?: IMargins;
  positions?: IPositions;
  pnl?: number;
  refetchMargins: () => void;
  refetchPositions: () => void;
  refetchPnl: () => void;
}

export const AuthenticationContext = createContext<IAuthenticationContext>(
  {} as any
);

export const AuthProvider: FC = ({ children }) => {
  const { data: userProfile, isError: isGetUserProfileError } =
    useGetUserProfile();
  const { isSuccess: isAuthenticated, isLoading: isAuthenticatedLoading } =
    useGetIsLogin();
  const { data: margins, refetch: refetchMargins } = useGetMargins();
  const { data: positions, refetch: refetchPositions } = useGetPositions();
  const { data: pnl, refetch: refetchPnl } = useGetPnl();

  const dispatch = useDispatch();

  useEffect(() => {
    if (userProfile && pnl) {
      if (
        pnl.pnl <= userProfile.max_loss ||
        pnl.pnl >= userProfile.max_profit
      ) {
        dispatch(toggle_trader());
      }
    }
  }, [userProfile, pnl, dispatch]);

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
        refetchMargins,
        refetchPositions,
        refetchPnl,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuth = () => useContext(AuthenticationContext);
