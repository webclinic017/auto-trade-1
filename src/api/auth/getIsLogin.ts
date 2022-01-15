import { Axios, queryClient } from "..";
import { AxiosResponse, AxiosError } from "axios";
import { useQuery, UseQueryResult } from "react-query";
import { LocalStorage } from "../../entities/localstorage";
import { StatusCodeUtil } from "../../utils/StatusCodeUtil";

const getIsLogin = async (): Promise<AxiosResponse> => {
  const response = await Axios.get("/users/is_login", {
    headers: {
      Authorization: `Token ${LocalStorage.authToken}`,
    },
  });

  if (StatusCodeUtil.is_error(response.status)) {
    throw new Error(response.statusText);
  }

  return response;
};

export const useGetIsLogin = (): UseQueryResult<AxiosResponse, AxiosError> =>
  useQuery<AxiosResponse, AxiosError>(["get-is-login"], getIsLogin, {
    onSuccess: () => queryClient.invalidateQueries("get-user-profile"),
    retry: 2,
  });
