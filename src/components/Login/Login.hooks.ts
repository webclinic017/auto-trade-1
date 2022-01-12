import { useState } from "react";
import { useGetAuthToken } from "../../api/auth/getAuthToken";
import { UserCrenentials } from "../../types/user";

interface UseLoginHooks {
  isLoginError: boolean;
  loginUser: (credentials: UserCrenentials) => Promise<void>;
}

export const useLogin = (): UseLoginHooks => {
  const { mutateAsync: getAuthToken } = useGetAuthToken();
  const [isLoginError, setIsLoginError] = useState(false);

  const loginUser = async (credentials: UserCrenentials) => {
    try {
      await getAuthToken(credentials);
    } catch {
      setIsLoginError(true);
    }
  };

  return {
    isLoginError,
    loginUser,
  };
};
