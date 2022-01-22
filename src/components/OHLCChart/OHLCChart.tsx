import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";

interface OHLCRouteParams {
  instrument_token?: string;
}

const OHLCChart: FC = () => {
  const { instrument_token } = useParams<OHLCRouteParams>();

  useEffect(() => {
    console.log(instrument_token);
  }, [instrument_token]);

  return null;
};

export default OHLCChart;
