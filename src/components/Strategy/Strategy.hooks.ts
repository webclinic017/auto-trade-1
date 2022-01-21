import { ChangeEvent, useState } from "react";
import { useDeleteStrategy } from "../../api/strategy_builder/deleteStrategy";
import { useToggleStrategy } from "../../api/strategy_builder/toggleStrategy";
import { IStrategy } from "../../types/strategy";

interface UseStrategyHook {
  toggleStrategy: (ev: ChangeEvent<HTMLInputElement>) => Promise<void>;
  deleteStrategy: () => Promise<void>;
  isStrategyEnabled: boolean;
}

export const useStrategy = (strategy: IStrategy): UseStrategyHook => {
  const [isStrategyEnabled, setIsStrategyEnabled] = useState<boolean>(
    strategy.enabled ?? false
  );
  const { mutateAsync: toggleStrategyAsync } = useToggleStrategy();
  const { mutateAsync: deleteStrategyAsync } = useDeleteStrategy();

  const toggleStrategy: UseStrategyHook["toggleStrategy"] = async (event) => {
    console.log(event.target.checked);

    try {
      await toggleStrategyAsync(strategy.id as number);
      setIsStrategyEnabled((val) => !val);
    } catch {
      alert("failed to update strategy");
    }
  };

  const deleteStrategy: UseStrategyHook["deleteStrategy"] = async () => {
    try {
      await deleteStrategyAsync(strategy.id as number);
    } catch {
      alert("failed to delete strategy");
    }
  };

  return {
    toggleStrategy,
    isStrategyEnabled,
    deleteStrategy,
  };
};
