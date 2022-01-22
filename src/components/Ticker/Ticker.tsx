import { FC } from "react";
import { ILiveTicker } from "../../types/kite";
import { IconButton } from "@material-ui/core";
import AssessmentTwoToneIcon from "@material-ui/icons/AssessmentTwoTone";
import { Link } from "react-router-dom";

const Ticker: FC<ILiveTicker> = (props) => {
  return (
    <tr>
      <td className="border border-slate-600 p-3">{props.tradingsymbol}</td>
      <td className="border border-slate-600 p-3">{props.last_price}</td>
      <td
        className={`border border-slate-600 p-3 ${
          props.change < 0 ? "text-red-600" : "text-green-600"
        }`}
      >
        {props.change}
      </td>
      <td className="border border-slate-600 p-3">
        <Link to={`/ohlc_chart/${props.instrument_token}`}>
          <IconButton>
            <AssessmentTwoToneIcon />
          </IconButton>
        </Link>
      </td>
    </tr>
  );
};

export default Ticker;
