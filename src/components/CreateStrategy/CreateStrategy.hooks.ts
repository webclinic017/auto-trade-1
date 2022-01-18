import { useCreateStrategy as useStrategy } from "../../api/strategy_builder/createStrategy";
import { ICreateStrategyForm } from "./CreateStrategy";

interface UserCreateStrategy {
  createStrategy: (values: ICreateStrategyForm) => Promise<{ message: string }>;
}

export const useCreateStrategy = (): UserCreateStrategy => {
  const { mutateAsync: createStrategy } = useStrategy();

  return { createStrategy };
};
