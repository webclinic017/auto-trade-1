import { useGetStrategyList } from "../../api/strategy_builder/getStrategyList";
import { IStrategy } from "../../types/strategy";

interface UseStrategyList {
  strategies?: IStrategy[];
}

export const useStrategyList = (): UseStrategyList => {
  const { data: strategies } = useGetStrategyList();

  return {
    strategies,
  };
};
