import { createContext, FC, useContext, useEffect } from "react";
import { useGetAuthToken } from "../api/auth/getAuthToken";
import { useGetIsLogin } from "../api/auth/getIsLogin";
import { useGetUserProfile } from "../api/auth/getUserProfile";
import { LocalStorage } from "../entities/localstorage";

interface UserCrenentials {
  username: string;
  password: string;
}

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
}

interface IAuthenticationContext {
  authenticated: boolean;
  loginUser: (credentials: UserCrenentials) => void;
  logoutUser: () => void;
  profile?: UserProfile;
}

export const AuthenticationContext = createContext<IAuthenticationContext>(
  {} as any
);

export const AuthenticationContextProvider: FC = ({ children }) => {
  const { mutateAsync: getAuthToken } = useGetAuthToken();
  const { data: userProfile, refetch: refetchProfile } = useGetUserProfile();
  const { isSuccess: authenticated } = useGetIsLogin();

  const loginUser = (crenentials: UserCrenentials) => {
    getAuthToken(crenentials).then(({ token }) => {
      LocalStorage.setAuthToken(token);
    });
  };

  const logoutUser = () => {
    LocalStorage.clearAuthToken();
  };

  useEffect(() => {
    if (authenticated) {
      refetchProfile();
    }
  }, [authenticated, refetchProfile]);

  return (
    <AuthenticationContext.Provider
      value={{ authenticated, loginUser, profile: userProfile, logoutUser }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuth = () => useContext(AuthenticationContext);
