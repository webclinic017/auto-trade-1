import { Axios } from "..";
import { AxiosResponse, AxiosError } from "axios";
import { useQuery, UseQueryResult } from "react-query";

const getIsLogin = async (): Promise<AxiosResponse> => {
  return Axios.get("/users/is_login");
};

export const useGetIsLogin = (): UseQueryResult<AxiosResponse, AxiosError> =>
  useQuery<AxiosResponse, AxiosError>(["get-is-login"], getIsLogin);
