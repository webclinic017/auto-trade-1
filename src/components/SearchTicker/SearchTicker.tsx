import { FC } from "react";
import { useSearchTicker } from "./SearchTicker.hooks";

interface SearchTickerProps {
  onSelectTicker?: ({
    ticker,
    exchange,
    instrument_type,
  }: {
    ticker?: string;
    exchange?: string;
    instrument_type?: string;
  }) => void;
}

const SearchTicker: FC<SearchTickerProps> = ({ onSelectTicker }) => {
  const { ticker, tickerChangeHandler, instruments, clearSearch } =
    useSearchTicker();

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
          return (
            <div
              key={id}
              onClick={() => {
                onSelectTicker &&
                  onSelectTicker({
                    ticker: instrument.tradingsymbol,
                    exchange: instrument.exchange,
                    instrument_type: instrument.instrument_type,
                  });

                clearSearch();
              }}
            >
              {instrument.tradingsymbol}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchTicker;
