import { FC } from "react";
import { useNodeForm } from "./NodeForm.hooks";

interface NodeFormProps {
  isRoot?: boolean;
  count?: number;
}

const NodeForm: FC<NodeFormProps> = ({ isRoot, count = 0 }) => {
  const { nodeTypeHandler, isNodeOperator } = useNodeForm({
    isRoot: isRoot ?? false,
  });

  return (
    <div className="form">
      <div className="bg-yellow-500 inline-block px-2 rounded-full text-sm text-white font-bold">
        {count}
      </div>
      <select onChange={nodeTypeHandler} className="form-input">
        <option>indicator</option>
        <option>operator</option>
        <option>constant</option>
      </select>
      <input type="text" className="form-input" placeholder="value" />
      <br />
      {isNodeOperator && (
        <div className="p-1 border-2 border-blue-300 shadow-md">
          <div>
            operand 1
            <NodeForm count={count + 1} />
          </div>
          <br />
          <div>
            operand 2
            <NodeForm count={count + 1} />
          </div>
        </div>
      )}
      {isRoot && (
        <button className="text-sm bg-blue-500 text-white py-1 px-3 rounded-md shadow-lg my-2">
          CREATE
        </button>
      )}
    </div>
  );
};

export default NodeForm;
