import { FC } from "react";
import Ticker from "../Ticker/Ticker";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const TickerLiveData: FC = () => {
  const tickers = useSelector((state: RootState) => state.tickers.data);

  return (
    <div className="my-5">
      <h1 className="text-2xl font-bold">LIVE DATA</h1>
      <div className="flex flex-col border-2 p-3">
        <input
          type="text"
          className="mb-4 border-gray-200 rounded-md"
          placeholder="search for the instrument"
        />

        <table className="shadow-md table-auto border border-separate">
          <thead>
            <tr>
              <td className="border border-slate-600 p-3">trading symbol</td>
              <td className="border border-slate-600 p-3">last price</td>
              <td className="border border-slate-600 p-3">chg %</td>
              <td className="border border-slate-600 p-3">controls</td>
            </tr>
          </thead>
          <tbody>
            {tickers.map((ticker) => {
              return <Ticker {...ticker} key={ticker.instrument_token} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TickerLiveData;
