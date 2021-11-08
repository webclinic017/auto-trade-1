import React from "react";
import SignalCard from "./SignalCard";
import { useStore } from "../context/StoreContext";

function SignalHistory() {
  const [{ signals }] = useStore();

  return (
    <div className="p-2 md:p-5">
      <h1 className="text-3xl mb-4">Signals</h1>
      <div>
        {signals.map((item, idx) => {
          return (
            <SignalCard
              key={idx}
              exchange={item.exchange}
              ltp={item.ltp}
              tag={item.tag}
              trading_symbol={item.trading_symbol}
              type={item.type}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SignalHistory;
