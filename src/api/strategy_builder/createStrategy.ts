import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { Axios } from "..";
import { LocalStorage } from "../../entities/localstorage";
import { INodeForm } from "../../types/forms";
import { StatusCodeUtil } from "../../utils/StatusCodeUtil";

interface CreateStrategyResponse {
  message: string;
}

interface CreateStrategyRequest {
  name: string;
  profit_percent: number;
  loss_percent: number;
  lot_size: number;
  entry: INodeForm;
  exit: INodeForm;
  tickers: string[];
}

export const createStrategy = async (
  request: CreateStrategyRequest
): Promise<CreateStrategyResponse> => {
  const { data, status, statusText } = await Axios.post(
    `/strategy_builder/create_strategy`,
    request,
    {
      headers: {
        Authorization: `Token ${LocalStorage.authToken}`,
      },
    }
  );

  if (StatusCodeUtil.is_error(status)) {
    throw Error(statusText);
  }

  return data;
};

export const useCreateStrategy = () =>
  useMutation<CreateStrategyResponse, AxiosError, CreateStrategyRequest>(
    ["create-strategy"],
    createStrategy
  );
