import { ChangeEvent, useState, useEffect } from "react";
import { useSearchInstruments } from "../../api/search/searchInstrument";
import { Instrument } from "../../types/kite";

interface UseSearchTicker {
  ticker: string;
  tickerChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  instruments: Instrument[];
}

export const useSearchTicker = (): UseSearchTicker => {
  const [ticker, setTicker] = useState<string>("");
  const { data: instruments, refetch: refetchInstruments } =
    useSearchInstruments(ticker);

  useEffect(() => {
    refetchInstruments();
  }, [ticker, refetchInstruments]);

  const tickerChangeHandler: UseSearchTicker["tickerChangeHandler"] = (
    event
  ) => {
    setTicker(event.target.value);
  };

  return {
    ticker,
    tickerChangeHandler,
    instruments: instruments ?? [],
  };
};
