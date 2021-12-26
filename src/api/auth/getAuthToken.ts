import { Axios } from "..";
import { AxiosError } from "axios";
import { useMutation, UseMutationResult } from "react-query";

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
  const { data } = await Axios.post("/api-token-auth", request);
  return data;
};

export const useGetAuthToken = (): UseMutationResult<
  GetAuthTokenResponse,
  AxiosError,
  GetAuthTokenRequest
> =>
  useMutation<GetAuthTokenResponse, AxiosError, GetAuthTokenRequest>(
    ["get-auth-token"],
    getAuthToken
  );
