import { useMutation } from "react-query";
import { Axios } from "..";
import { LocalStorage } from "../../entities/localstorage";
import { StatusCodeUtil } from "../../utils/StatusCodeUtil";

type ToggleStrategyResponse = { message: string };
type ToggleStrategyRequest = number;

export const toggleStrategy = async (
  id: ToggleStrategyRequest
): Promise<ToggleStrategyResponse> => {
  const { data, status, statusText } = await Axios.patch(
    `/strategy_builder/toggle_strategy/${id}`,
    undefined,
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

export const useToggleStrategy = () =>
  useMutation<ToggleStrategyResponse, Error, ToggleStrategyRequest>(
    ["toggle-strategy"],
    toggleStrategy
  );
