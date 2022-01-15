import { FC } from "react";
import { IconButton } from "@material-ui/core";
import AddSharpIcon from "@material-ui/icons/AddSharp";

const CreateStrategy: FC = () => {
  return (
    <div className="p-3">
      <h1 className="text-3xl text-gray-400">create strategy</h1>

      <div className="mt-5">
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-extrabold">settings</h1>
          <div className="p-2 w-1/3">
            <input
              className="form-input"
              placeholder="Strategy Name . . ."
              type="text"
            />

            <div className="flex space-x-1">
              <input
                className="form-input"
                placeholder="Profit Percentage"
                type="number"
              />
              <input
                className="form-input"
                placeholder="Loss Percentage"
                type="number"
              />
            </div>
            <button className="font-bold mt-2 shadow-lg text-white bg-blue-400 px-5 py-2 rounded-md w-full">
              create
            </button>
          </div>
        </div>
        <div>
          <div className="flex items-center">
            <h1 className="text-green-500 font-extrabold text-xl">
              entry conditions
            </h1>

            <IconButton>
              <AddSharpIcon className="text-green-600" />
            </IconButton>
          </div>
        </div>
        <div>
          <div className="flex items-center">
            <h1 className="text-red-500 font-extrabold text-xl">
              exit conditions
            </h1>
            <IconButton>
              <AddSharpIcon className="text-red-600" />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStrategy;
