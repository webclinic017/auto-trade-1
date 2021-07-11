import React, { useState } from "react";
import { Switch } from "@material-ui/core";

import SignalCellular4BarIcon from "@material-ui/icons/SignalCellular4Bar";
import SignalCellular1BarIcon from "@material-ui/icons/SignalCellular1Bar";

function WorkerCard({ title }) {
  const [checked, setChecked] = useState(false);

  return (
    <div className="h-30 bg-indigo-500 rounded-lg p-4 shadow-md font-extrabold text-white">
      <div>{title}</div>
      <div className="font-light flex items-start">
        <Switch
          checked={checked}
          onChange={(event) => setChecked(event.target.checked)}
        />
        <div className="flex-1 flex justify-end">
          {checked ? (
            <SignalCellular4BarIcon className="text-green-400" />
          ) : (
            <SignalCellular1BarIcon className="text-red-500" />
          )}
        </div>
      </div>
    </div>
  );
}

export default WorkerCard;
