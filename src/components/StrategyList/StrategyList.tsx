import { FC } from "react";
import { useStrategyList } from "./StrategyList.hooks";
import Strategy from "../Strategy/Strategy";
import { Switch } from "@material-ui/core";

const StrategyList: FC = () => {
  const { strategies, toggleStrategyWorker, isStrategyWorkerRunning } =
    useStrategyList();

  return (
    <div className="my-5">
      <div className="flex">
        <h1 className="text-2xl font-bold flex-1">STRATEGIES</h1>
        <Switch
          checked={isStrategyWorkerRunning}
          onChange={toggleStrategyWorker}
        />
      </div>

      <div className="border border-gray-200 p-3">
        {strategies?.map((strategy) => {
          return <Strategy key={strategy.id} strategy={strategy} />;
        })}
      </div>
    </div>
  );
};

export default StrategyList;
