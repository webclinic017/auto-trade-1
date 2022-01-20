import { useQuery } from "react-query";
import { Axios } from "..";
import { LocalStorage } from "../../entities/localstorage";
import { IMargins } from "../../types/kite";
import { StatusCodeUtil } from "../../utils/StatusCodeUtil";

export const getMargins = async (): Promise<IMargins> => {
  const { data, status, statusText } = await Axios.get(`/margins`, {
    headers: {
      Authorization: `Token ${LocalStorage.authToken}`,
    },
  });

  if (StatusCodeUtil.is_error(status)) {
    throw new Error(statusText);
  }

  return data;
};

export const useGetMargins = () =>
  useQuery<unknown, Error, IMargins>(["get-margins"], getMargins, {
    retry: false,
  });
