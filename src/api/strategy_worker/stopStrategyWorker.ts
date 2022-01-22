import { useMutation } from "react-query";
import { Axios } from "..";
import { LocalStorage } from "../../entities/localstorage";
import { StatusCodeUtil } from "../../utils/StatusCodeUtil";

type StopStrategyWorkerResponse = { message: string };

export const stopStrategyWorker =
  async (): Promise<StopStrategyWorkerResponse> => {
    const { data, status, statusText } = await Axios.post(
      `strategy_worker/stop_worker`,
      undefined,
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

export const useStopStrategyWorker = () =>
  useMutation(["stop-strategy"], stopStrategyWorker);
