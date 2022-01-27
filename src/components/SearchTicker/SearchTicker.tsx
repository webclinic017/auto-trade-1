import { FC } from "react";
import { useSearchTicker } from "./SearchTicker.hooks";

interface SearchTickerProps {
  onSelectTicker?: ({
    tradingsymbol,
    exchange,
    instrument_token,
    lot_size,
  }: {
    tradingsymbol?: string;
    exchange?: string;
    instrument_token?: string;
    lot_size?: string;
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
                    tradingsymbol: instrument.tradingsymbol,
                    exchange: instrument.exchange,
                    instrument_token: instrument.instrument_token,
                    lot_size: instrument.lot_size,
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
