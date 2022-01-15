import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { Axios } from "..";
import { LocalStorage } from "../../entities/localstorage";
import { StatusCodeUtil } from "../../utils/StatusCodeUtil";

interface GetZerodhaLoginUrlResponse {
  login_url: string;
}

export const getZerodhaLoginUrl =
  async (): Promise<GetZerodhaLoginUrlResponse> => {
    const { data, status, statusText } = await Axios.get(
      "/users/zerodha_login_url",
      {
        headers: { Authorization: `Token ${LocalStorage.authToken}` },
      }
    );

    if (StatusCodeUtil.is_error(status)) {
      throw new Error(statusText);
    }

    return data;
  };

export const useGetZerodhaLoginUrl = () =>
  useQuery<unknown, AxiosError, GetZerodhaLoginUrlResponse>(
    ["get-zerodha-login-url"],
    getZerodhaLoginUrl,
    {
      retry: false,
    }
  );
