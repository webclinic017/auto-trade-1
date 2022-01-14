import { Axios, queryClient } from "..";
import { AxiosResponse, AxiosError } from "axios";
import { useQuery, UseQueryResult } from "react-query";
import { LocalStorage } from "../../entities/localstorage";

const getIsLogin = async (): Promise<AxiosResponse> => {
  const response = await Axios.get("/users/is_login", {
    headers: {
      Authorization: `Token ${LocalStorage.authToken}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("unauthorized");
  }

  return response;
};

export const useGetIsLogin = (): UseQueryResult<AxiosResponse, AxiosError> =>
  useQuery<AxiosResponse, AxiosError>(["get-is-login"], getIsLogin, {
    onSuccess: () => queryClient.invalidateQueries("get-user-profile"),
    retry: 2,
  });
