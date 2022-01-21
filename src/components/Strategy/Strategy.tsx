import { FC } from "react";
import { IStrategy } from "../../types/strategy";
import { useStrategy } from "./Strategy.hooks";
import { IconButton, Switch } from "@material-ui/core";
import DeleteOutline from "@material-ui/icons/DeleteOutline";

interface StrategyProps {
  strategy: IStrategy;
}

const Strategy: FC<StrategyProps> = ({ strategy }) => {
  const { toggleStrategy, isStrategyEnabled, deleteStrategy } =
    useStrategy(strategy);

  return (
    <div className="flex items-center p-3 shadow-md">
      <div>{strategy.id}</div>
      <div className="flex-1 ml-4">{strategy.name}</div>

      <Switch
        value={isStrategyEnabled}
        onChange={toggleStrategy}
        color="primary"
      />
      <IconButton onClick={deleteStrategy}>
        <DeleteOutline color="error" />
      </IconButton>
    </div>
  );
};

export default Strategy;
