import { useQuery } from "react-query";
import { Axios } from "..";
import { LocalStorage } from "../../entities/localstorage";
import { StatusCodeUtil } from "../../utils/StatusCodeUtil";

type IsStrategyWorkerEnabledResponse = { enabled: boolean };

export const isStrategyWorkerEnabled =
  async (): Promise<IsStrategyWorkerEnabledResponse> => {
    const { data, status, statusText } = await Axios.get(
      `/strategy_worker/is_enabled`,
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

export const useIsStrategyWorkerEnabled = () =>
  useQuery<unknown, Error, IsStrategyWorkerEnabledResponse>(
    ["is-strategy-worker-enabled"],
    isStrategyWorkerEnabled
  );
