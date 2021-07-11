import React from "react";

function ColorCard({ color, title, value, icon = () => {} }) {
  return (
    <div className={`h-32 bg-${color}-500 shadow-lg rounded-lg p-3`}>
      <div
        className={`flex flex-row items-center text-${color}-400 md:text-lg`}
      >
        {icon()} <div className="ml-3 font-bold text-white">{title}</div>
      </div>
      <div className="md:text-xl text-white font-bold ml-5">{value}</div>
    </div>
  );
}

export default ColorCard;
