import React from "react";
import ColorCard from "./ColorCard";
import WorkerCard from "./WorkerCard";

import { DollarIcon, MoneyIcon } from "./icons";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

import { useTrade } from "../context/TradeContext";

function Home({ accessToken }) {
  const {
    tradeMode,
    tradeIndexOpt,
    tradeIndexFut,
    tradeStock,
    tradeStockOpt,
    tradeStockFut,

    setTradeIndexOpt,
    setTradeIndexFut,
    setTradeStock,
    setTradeStockOpt,
    setTradeStockFut,
  } = useTrade();

  return (
    <div className="p-3 mt-5">
      {accessToken === null ? (
        <h1 className="text-center p-4 -mt-3 mb-3 bg-red-500 rounded-md text-white font-bold">
          please connect with zerodha
        </h1>
      ) : null}

      {tradeMode ? null : (
        <h1 className="text-center p-4 -mt-3 mb-3 bg-red-800 rounded-md text-red-600 font-bold">
          you cant trade as your limit of pnl has exceeded
        </h1>
      )}

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
          value={0}
        />
        <ColorCard
          title="Sell"
          color="red"
          icon={() => <AccountBalanceIcon className="h-6 w-6" />}
          value={0}
        />
      </div>

      <h1 className="my-5 text-2xl p-2 font-semibold">Workers</h1>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <WorkerCard
          title="index options"
          value={tradeIndexOpt}
          fun={setTradeIndexOpt}
        />
        <WorkerCard
          title="index futures"
          value={tradeIndexFut}
          fun={setTradeIndexFut}
        />
        <WorkerCard title="stocks" value={tradeStock} fun={setTradeStock} />
        <WorkerCard
          title="stock options"
          value={tradeStockOpt}
          fun={setTradeStockOpt}
        />
        <WorkerCard
          title="stock futures"
          value={tradeStockFut}
          fun={setTradeStockFut}
        />
      </div>
      <h1 className="my-5 text-2xl p-2 font-semibold">Analytics</h1>
    </div>
  );
}

export default Home;
