import { Axios, queryClient } from "..";
import { AxiosError } from "axios";
import { useMutation, UseMutationResult } from "react-query";
import { LocalStorage } from "../../entities/localstorage";
import { StatusCodeUtil } from "../../utils/StatusCodeUtil";

interface GetAuthTokenResponse {
  token: string;
}

interface GetAuthTokenRequest {
  username: string;
  password: string;
}

export const getAuthToken = async (
  request: GetAuthTokenRequest
): Promise<GetAuthTokenResponse> => {
  const { data, status, statusText } = await Axios.post(
    "/api-token-auth/",
    request,
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  if (StatusCodeUtil.is_error(status)) {
    throw new Error(statusText);
  }

  return data;
};

export const useGetAuthToken = (): UseMutationResult<
  GetAuthTokenResponse,
  AxiosError,
  GetAuthTokenRequest
> =>
  useMutation<GetAuthTokenResponse, AxiosError, GetAuthTokenRequest>(
    ["get-auth-token"],
    getAuthToken,
    {
      onSuccess: ({ token }) => {
        LocalStorage.setAuthToken(token);

        queryClient.invalidateQueries("get-is-login");
        queryClient.invalidateQueries("get-zerodha-login-url");
      },
    }
  );
