import { Axios } from "..";

export const getHistoricalData = async (): Promise<any> => {
  const { data } = await Axios.get(`/historical_data`);

  return data;
};
