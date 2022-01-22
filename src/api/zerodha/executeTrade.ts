import { useMutation } from "react-query";
import { Axios, queryClient } from "..";
import { LocalStorage } from "../../entities/localstorage";
import { ITrade } from "../../types/trade";
import { StatusCodeUtil } from "../../utils/StatusCodeUtil";

type ExecuteTradeRequest = ITrade;
type ExecuteTradeResponse = { type: "BUY" | "SELL"; orderid: number };

export const executeTrade = async (
  request: ExecuteTradeRequest
): Promise<ExecuteTradeResponse> => {
  const { data, status, statusText } = await Axios.post(
    `/zerodha/execute_trade/`,
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

export const useExecuteTrade = () =>
  useMutation<ExecuteTradeResponse, Error, ExecuteTradeRequest>(
    ["execute-trade"],
    executeTrade,
    {
      retry: false,
      onSuccess: () => {
        queryClient.invalidateQueries("get-margins");
        queryClient.invalidateQueries("get-positions");
      },
    }
  );
