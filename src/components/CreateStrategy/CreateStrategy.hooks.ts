import { useCreateStrategy as useStrategy } from "../../api/strategy_builder/createStrategy";
import { ICreateStrategyForm } from "./CreateStrategy";
import { useSnackbar } from "notistack";

interface UserCreateStrategy {
  createStrategy: (values: ICreateStrategyForm) => Promise<void>;
}

export const useCreateStrategy = (): UserCreateStrategy => {
  const { mutateAsync: createStrategyAsync } = useStrategy();
  const { enqueueSnackbar } = useSnackbar();

  const createStrategy: UserCreateStrategy["createStrategy"] = async (
    values
  ) => {
    try {
      await createStrategyAsync(values);

      enqueueSnackbar("created strategy successfully", {
        variant: "success",
      });
    } catch (error: any) {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    }
  };

  return { createStrategy };
};
