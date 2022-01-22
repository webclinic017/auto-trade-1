import { useState, useEffect } from "react";
import { useGetStrategyList } from "../../api/strategy_builder/getStrategyList";
import { useIsStrategyWorkerEnabled } from "../../api/strategy_worker/isStrategyWorkerEnabled";
import { useStartStrategyWorker } from "../../api/strategy_worker/startStrategyWorker";
import { useStopStrategyWorker } from "../../api/strategy_worker/stopStrategyWorker";
import { IStrategy } from "../../types/strategy";

interface UseStrategyList {
  strategies?: IStrategy[];
  toggleStrategyWorker: () => void;
  isStrategyWorkerRunning: boolean;
}

export const useStrategyList = (): UseStrategyList => {
  const { data: strategies } = useGetStrategyList();
  const { mutate: startStrategyWorker } = useStartStrategyWorker();
  const { mutate: stopStrategyWorker } = useStopStrategyWorker();
  const { data: isStrategyWorkerEnabled } = useIsStrategyWorkerEnabled();

  const [isStrategyWorkerRunning, setIsStrategyWorkerRunning] =
    useState<boolean>(isStrategyWorkerEnabled?.enabled || false);

  useEffect(() => {
    if (isStrategyWorkerEnabled?.enabled !== undefined) {
      setIsStrategyWorkerRunning(isStrategyWorkerEnabled.enabled);
    }
  }, [isStrategyWorkerEnabled]);

  const toggleStrategyWorker: UseStrategyList["toggleStrategyWorker"] = () => {
    setIsStrategyWorkerRunning((val) => {
      if (!val) {
        startStrategyWorker();
      } else {
        stopStrategyWorker();
      }

      return !val;
    });
  };

  return {
    strategies,
    toggleStrategyWorker,
    isStrategyWorkerRunning,
  };
};
