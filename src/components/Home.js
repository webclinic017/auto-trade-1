import React from "react";
import ColorCard from "./ColorCard";
import WorkerCard from "./WorkerCard";

import { DollarIcon, MoneyIcon } from "./icons";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import RefreshIcon from "@material-ui/icons/Refresh";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

import { IconButton } from "@material-ui/core";

import { useTrade } from "../context/TradeContext";
import { useNetwork } from "../context/NetworkContext";
import { useAuth } from "../context/AuthContext";
import { useStore } from "../context/StoreContext";

function Home() {
  const {
    tradeMode,
    tradeIndexOpt,
    tradeIndexFut,
    tradeStock,
    tradeStockOpt,
    tradeStockFut,

    sells,
    buys,
    pnl,

    setTradeIndexOpt,
    setTradeIndexFut,
    setTradeStock,
    setTradeStockOpt,
    setTradeStockFut,
  } = useTrade();

  const network = useNetwork();
  const auth = useAuth();
  const [{ margins }] = useStore();

  return (
    <div className="p-3 mt-5">
      <h1 className="my-1 text-2xl p-2 font-semibold">Dashboard</h1>
      {network === false ? (
        <h1 className="text-center p-2 my-3 bg-yellow-400 text-white font-bold rounded shadow-md">
          network disconnected please refresh the page
          <IconButton onClick={() => window.location.reload()}>
            <RefreshIcon />
          </IconButton>
        </h1>
      ) : null}
      {auth.access_token === null ? (
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
          title="Total Margin"
          color="yellow"
          icon={() => <DollarIcon className="h-6 w-6" />}
          value={margins?.equity?.available?.opening_balance}
        />
        <ColorCard
          title="Buy"
          color="green"
          icon={() => <MoneyIcon className="h-6 w-6" />}
          value={buys}
        />
        <ColorCard
          title="Sell"
          color="red"
          icon={() => <AccountBalanceIcon className="h-6 w-6" />}
          value={sells}
        />
        <ColorCard
          title="Margin Avaliable"
          color="blue"
          value={margins?.equity?.available?.live_balance}
          icon={() => <AccountBalanceWalletIcon className="h-6 w-6" />}
        />
        <ColorCard
          title="Pnl"
          color="gray"
          value={pnl}
          icon={() => <AttachMoneyIcon className="h-6 w-6" />}
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
    </div>
  );
}

export default Home;
