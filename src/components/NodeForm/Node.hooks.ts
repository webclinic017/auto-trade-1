import { ChangeEvent, useState } from "react";

type NodeType = "operator" | "indicator" | "constant";

interface UseNodeHook {
  isNodeOperator: boolean;
  nodeTypeHandler: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export const useNode = (): UseNodeHook => {
  const [isNodeOperator, setIsNodeOperator] = useState(false);

  const nodeTypeHandler: UseNodeHook["nodeTypeHandler"] = (event) => {
    const nodeType = event.target.value as NodeType;

    switch (nodeType) {
      case "operator":
        setIsNodeOperator(true);
        break;
      default:
        setIsNodeOperator(false);
        break;
    }
  };

  return {
    isNodeOperator,
    nodeTypeHandler,
  };
};
