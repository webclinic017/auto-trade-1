import { useMutation } from "react-query";
import { Axios, queryClient } from "..";
import { LocalStorage } from "../../entities/localstorage";
import { StatusCodeUtil } from "../../utils/StatusCodeUtil";

type DeleteStrategyRequest = number;
type DeleteStrategyResponse = { message: string };

export const deleteStrategy = async (
  id: DeleteStrategyRequest
): Promise<DeleteStrategyResponse> => {
  const { data, status, statusText } = await Axios.delete(
    `/strategy_builder/delete_strategy/${id}`,
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

export const useDeleteStrategy = () =>
  useMutation<DeleteStrategyResponse, Error, DeleteStrategyRequest>(
    ["delete-strategy"],
    deleteStrategy,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("get-strategy-list");
      },
    }
  );
