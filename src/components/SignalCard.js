import React from "react";

function SignalCard({ tag, exchange, ltp, trading_symbol, type }) {
  return (
    <div className="shadow-md p-2 flex bg-blue-400 text-blue-600 my-2">
      <div className="flex-1">
        <strong>{tag}</strong> | <strong>{exchange}</strong> |{" "}
        <strong>{ltp}</strong> | <strong>{trading_symbol}</strong> |{" "}
        <strong>{type}</strong>
      </div>
      <div>
        <button>{tag === "ENTRY" ? "BUY" : "SELL"}</button>
      </div>
    </div>
  );
}

export default SignalCard;
