import React from "react";
import ColorCard from "./ColorCard";
import WorkerCard from "./WorkerCard";

import { DollarIcon, MoneyIcon } from "./icons";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

function Home({ accessToken }) {
  return (
    <div className="p-3 mt-5">
      {accessToken === null ? (
        <h1 className="text-center p-4 -mt-3 mb-3 bg-red-500 rounded-md text-white font-bold">
          please connect with zerodha
        </h1>
      ) : null}

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <ColorCard
          title="Investment"
          color="yellow"
          icon={() => <DollarIcon className="h-6 w-6" />}
          value={localStorage.getItem("investment")}
        />
        <ColorCard
          title="Buy"
          color="green"
          icon={() => <MoneyIcon className="h-6 w-6" />}
          value={5000}
        />
        <ColorCard
          title="Sell"
          color="red"
          icon={() => <AccountBalanceIcon className="h-6 w-6" />}
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
      <h1 className="my-5 text-2xl p-2 font-semibold">Analytics</h1>
    </div>
  );
}

export default Home;
