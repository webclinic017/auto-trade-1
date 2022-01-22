import { useMutation } from "react-query";
import { Axios } from "..";
import { LocalStorage } from "../../entities/localstorage";
import { StatusCodeUtil } from "../../utils/StatusCodeUtil";

type StartStrategyWorkerResponse = { message: string };

export const startStrategyWorker =
  async (): Promise<StartStrategyWorkerResponse> => {
    const { data, status, statusText } = await Axios.post(
      `strategy_worker/start_worker`,
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

export const useStartStrategyWorker = () =>
  useMutation(["start-strategy"], startStrategyWorker);
