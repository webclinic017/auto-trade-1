import { useQuery } from "react-query";
import { Axios } from "..";
import { LocalStorage } from "../../entities/localstorage";
import { StatusCodeUtil } from "../../utils/StatusCodeUtil";

type PnlResponse = { pnl: number };

export const getPnl = async (): Promise<PnlResponse> => {
  const { data, status, statusText } = await Axios.get(`/pnl`, {
    headers: {
      Authorization: `Token ${LocalStorage.authToken}`,
    },
  });

  if (StatusCodeUtil.is_error(status)) {
    throw new Error(statusText);
  }

  return data;
};

export const useGetPnl = () =>
  useQuery<unknown, Error, PnlResponse>(["get-pnl"], getPnl, {
    retry: false,
  });
