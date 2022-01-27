import { ChangeEvent, useState } from "react";

type NodeType = "operator" | "indicator" | "constant";

interface UseNodeHook {
  isNodeOperator: boolean;
  isNodeIndicator: boolean;
  nodeTypeHandler: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export const useNode = (): UseNodeHook => {
  const [isNodeOperator, setIsNodeOperator] = useState(false);
  const [isNodeIndicator, setIsNodeIndicator] = useState(false);

  const nodeTypeHandler: UseNodeHook["nodeTypeHandler"] = (event) => {
    const nodeType = event.target.value as NodeType;

    switch (nodeType) {
      case "operator":
        setIsNodeOperator(true);
        setIsNodeIndicator(false);
        break;
      case "indicator":
        setIsNodeIndicator(true);
        setIsNodeOperator(false);
        break;
      default:
        setIsNodeOperator(false);
        setIsNodeIndicator(false);
        break;
    }
  };

  return {
    isNodeOperator,
    nodeTypeHandler,
    isNodeIndicator,
  };
};
