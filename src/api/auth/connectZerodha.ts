import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { Axios } from "..";
import { LocalStorage } from "../../entities/localstorage";

interface ConnectZerodhaRequest {
  request_token: string;
}

interface ConnectZerodhaResponse {
  access_token: string;
}

export const connectZerodha = async (
  request: ConnectZerodhaRequest
): Promise<ConnectZerodhaResponse> => {
  const { data, status } = await Axios.post(
    `/zerodha_login/access_token`,
    request,
    {
      headers: {
        Authorization: `Token ${LocalStorage.authToken}`,
      },
    }
  );

  if (status !== 200) {
    throw new Error("unauthorized");
  }

  return data;
};

export const useConnectZerodha = () =>
  useMutation<ConnectZerodhaResponse, AxiosError, ConnectZerodhaRequest>(
    ["connect-zerodha"],
    connectZerodha
  );
