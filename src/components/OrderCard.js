import React from "react";

function OrderCard({ trading_symbol, exchange, quantity, action }) {
  return (
    <div
      className={`h-44 bg-${
        action === "SELL" ? "green" : "red"
      }-500 rounded-lg shadow p-4`}
    >
      <strong className="text-white">{trading_symbol}</strong>
      <br />
      <strong className="text-white">{action}</strong>
      <br />
      <strong className="text-white">{exchange}</strong>
      <br />
      <strong className="text-white">{quantity}</strong>
    </div>
  );
}

export default OrderCard;
