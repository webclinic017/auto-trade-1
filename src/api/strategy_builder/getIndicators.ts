import { useQuery } from "react-query";
import { Axios } from "..";
import { ITechnicalIndicator } from "../../types/strategy";
import { StatusCodeUtil } from "../../utils/StatusCodeUtil";

export const getIndicators = async (): Promise<ITechnicalIndicator[]> => {
  const { data, status, statusText } = await Axios.get(
    `/strategy_builder/list_indicators`
  );

  if (StatusCodeUtil.is_error(status)) {
    throw new Error(statusText);
  }

  return data;
};

export const useGetIndicators = () =>
  useQuery<unknown, Error, ITechnicalIndicator[]>(
    ["get-indicators"],
    getIndicators
  );
