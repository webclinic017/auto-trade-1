import { FC } from "react";
import { useSearchTicker } from "./SearchTicker.hooks";

const SearchTicker: FC = () => {
  const { ticker, tickerChangeHandler, instruments } = useSearchTicker();

  return (
    <div>
      <input
        className="form-input"
        type="text"
        value={ticker}
        onChange={tickerChangeHandler}
      />
      <div className="border p-3">
        {instruments.map((instrument, id) => {
          return <div key={id}>{instrument.tradingsymbol}</div>;
        })}
      </div>
    </div>
  );
};

export default SearchTicker;
