import { FC } from "react";
import { useStrategyList } from "./StrategyList.hooks";
import Strategy from "../Strategy/Strategy";

const StrategyList: FC = () => {
  const { strategies } = useStrategyList();

  return (
    <div className="my-5">
      <h1 className="text-2xl font-bold">STRATEGIES</h1>
      <div className="border border-gray-200 p-3">
        {strategies?.map((strategy) => {
          return <Strategy key={strategy.id} strategy={strategy} />;
        })}
      </div>
    </div>
  );
};

export default StrategyList;
