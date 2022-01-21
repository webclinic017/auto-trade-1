import { useQuery } from "react-query";
import { Axios } from "..";
import { LocalStorage } from "../../entities/localstorage";
import { IStrategy } from "../../types/strategy";
import { StatusCodeUtil } from "../../utils/StatusCodeUtil";

export const getStrategyList = async (): Promise<IStrategy[]> => {
  const { data, status, statusText } = await Axios.get(
    `strategy_builder/get_strategies`,
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

export const useGetStrategyList = () =>
  useQuery<unknown, Error, IStrategy[]>(["get-strategy-list"], getStrategyList);
