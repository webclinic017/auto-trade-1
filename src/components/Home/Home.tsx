import ColorCard from "../ColorCard";
import WorkerCard from "../WorkerCard";
import Positions from "../Positions/Positions";

import { DollarIcon, MoneyIcon } from "../icons";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import RefreshIcon from "@material-ui/icons/Refresh";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

import { IconButton } from "@material-ui/core";
import { useAuth } from "../../context/AuthContext";
import { useNetwork } from "../../context/NetworkContext";
import { useHome } from "./Home.hooks";
import TickerLiveData from "../TickerLiveData/TickerLiveData";
import StrategyList from "../StrategyList/StrategyList";

function Home() {
  const { profile, isGetUserProfileError, margins, pnl } = useAuth();
  const { isNetworkActive } = useNetwork();
  const {
    isIndexOptionsEnabled,
    isStockOptionsEnabled,
    isStocksEnabled,
    toggleIndexOptions,
    toggleStockOptions,
    toggleStocks,
    isTraderEnabled,
  } = useHome();

  return (
    <div className="p-3 mt-5">
      <h1 className="my-1 text-2xl p-2 font-semibold">Dashboard</h1>
      {!isNetworkActive && (
        <h1 className="text-center p-2 my-3 bg-yellow-400 text-white font-bold rounded shadow-md">
          network disconnected please refresh the page
          <IconButton onClick={() => window.location.reload()}>
            <RefreshIcon />
          </IconButton>
        </h1>
      )}
      {!profile?.is_accesstoken_valid && (
        <h1 className="text-center p-4 my-3 bg-red-500 rounded-md text-white font-bold">
          please connect with zerodha
        </h1>
      )}

      {!isTraderEnabled && (
        <h1 className="text-center p-4 -mt-3 mb-3 bg-red-800 rounded-md text-red-600 font-bold">
          you cant trade as your limit of pnl has exceeded
        </h1>
      )}

      {isGetUserProfileError && (
        <h1 className="text-center p-4 -mt-3 mb-3 bg-red-500 rounded-md text-white font-bold">
          please update your settings
        </h1>
      )}

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <ColorCard
          title="Total Margin"
          color="yellow"
          icon={() => <DollarIcon className="h-6 w-6" />}
          value={margins?.equity?.available?.cash}
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

      <StrategyList />

      <TickerLiveData />

      <h1 className="my-2 mt-10 text-2xl p-2 font-semibold">INSTRUMENTS</h1>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <WorkerCard
          title="index options"
          value={isIndexOptionsEnabled}
          fun={toggleIndexOptions}
        />
        <WorkerCard title="stocks" value={isStocksEnabled} fun={toggleStocks} />
        <WorkerCard
          title="stock options"
          value={isStockOptionsEnabled}
          fun={toggleStockOptions}
        />
      </div>
      <Positions />
    </div>
  );
}

export default Home;
