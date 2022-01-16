import { FC } from "react";
import NodeForm from "../NodeForm/NodeForm";

const CreateStrategy: FC = () => {
  return (
    <div className="p-3">
      <div className="text-md py-2 text-center font-semibold">
        CREATE A STRATEGY
      </div>
      <div className="flex flex-col form space-y-3">
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-bold text-blue-500">
            Enter Strategy Name
          </label>
          <input className="form-input" type="text" />
        </div>

        <div className="flex space-x-2">
          <div className="flex flex-col">
            <label className="text-sm font-bold text-green-500">
              profit (%)
            </label>
            <input
              className="form-input focus:ring-green-600 focus:border-transparent focus:ring-2"
              type="number"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-bold text-red-500">loss (%)</label>
            <input
              className="form-input focus:ring-red-600 focus:border-transparent focus:ring-2"
              type="number"
            />
          </div>
        </div>

        <h1 className="text-center font-bold">STRATEGY SETTING</h1>

        <div>
          <h1 className="font-bold text-green-500">entry conditions</h1>
          <NodeForm isRoot />
        </div>

        <div>
          <h1 className="font-bold text-red-500">exit conditions</h1>
          <NodeForm isRoot />
        </div>
      </div>
    </div>
  );
};

export default CreateStrategy;
