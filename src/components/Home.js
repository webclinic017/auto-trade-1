import React from "react";
import ColorCard from "./ColorCard";
import WorkerCard from "./WorkerCard";

import { DollarIcon, MoneyIcon, ThumbDownIcon } from "./icons";

function Home() {
  return (
    <div className="p-3 mt-8">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <ColorCard
          title="Investment"
          color="yellow"
          icon={() => <DollarIcon className="h-6 w-6" />}
          value={20000}
        />
        <ColorCard
          title="Profit"
          color="green"
          icon={() => <MoneyIcon className="h-6 w-6" />}
          value={5000}
        />
        <ColorCard
          title="Loss"
          color="red"
          icon={() => <ThumbDownIcon className="h-6 w-6" />}
          value={1000}
        />
      </div>

      <h1 className="my-5 text-2xl p-2 font-semibold">Workers</h1>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <WorkerCard title="index options" />
        <WorkerCard title="index futures" />
        <WorkerCard title="stocks" />
        <WorkerCard title="stock options" />
        <WorkerCard title="stock futures" />
      </div>
    </div>
  );
}

export default Home;
