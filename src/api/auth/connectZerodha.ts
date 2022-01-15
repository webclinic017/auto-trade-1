import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { Axios } from "..";
import { LocalStorage } from "../../entities/localstorage";
import { StatusCodeUtil } from "../../utils/StatusCodeUtil";

interface ConnectZerodhaRequest {
  request_token: string;
}

interface ConnectZerodhaResponse {
  access_token: string;
}

export const connectZerodha = async (
  request: ConnectZerodhaRequest
): Promise<ConnectZerodhaResponse> => {
  const { data, status, statusText } = await Axios.post(
    `/zerodha_login/access_token`,
    request,
    {
      headers: {
        Authorization: `Token ${LocalStorage.authToken}`,
      },
    }
  );

  if (StatusCodeUtil.is_error(status)) {
    throw new Error(statusText);
  }

  return data;
};

export const useConnectZerodha = () =>
  useMutation<ConnectZerodhaResponse, AxiosError, ConnectZerodhaRequest>(
    ["connect-zerodha"],
    connectZerodha
  );
