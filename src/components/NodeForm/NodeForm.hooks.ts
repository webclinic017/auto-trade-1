import { ChangeEvent, useState, useEffect } from "react";

type NodeType = "operator" | "indicator" | "constant";

interface UseNodeFormHook {
  isNodeOperator: boolean;
  nodeTypeHandler: (event: ChangeEvent<HTMLSelectElement>) => void;
}

interface UseNodeFormHookParams {
  isRoot: boolean;
}

export const useNodeForm = ({
  isRoot,
}: UseNodeFormHookParams): UseNodeFormHook => {
  const [isNodeOperator, setIsNodeOperator] = useState(false);

  useEffect(() => {
    console.log(isRoot);
  }, [isRoot]);

  const nodeTypeHandler: UseNodeFormHook["nodeTypeHandler"] = (event) => {
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
