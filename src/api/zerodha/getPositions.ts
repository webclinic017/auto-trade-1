import { useQuery } from "react-query";
import { Axios } from "..";
import { LocalStorage } from "../../entities/localstorage";
import { IPositions } from "../../types/kite";
import { StatusCodeUtil } from "../../utils/StatusCodeUtil";

export const getPositions = async (): Promise<IPositions> => {
  const { data, status, statusText } = await Axios.get(`/zerodha/positions`, {
    headers: {
      Authorization: `Token ${LocalStorage.authToken}`,
    },
  });

  if (StatusCodeUtil.is_error(status)) {
    throw new Error(statusText);
  }

  return data;
};

export const useGetPositions = () =>
  useQuery<unknown, Error, IPositions>(["get-positions"], getPositions, {
    retry: false,
  });
