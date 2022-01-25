import { useQuery } from "react-query";
import { Axios } from "..";
import { Instrument } from "../../types/kite";
import { StatusCodeUtil } from "../../utils/StatusCodeUtil";

type SearchInstrumentsResponse = Instrument[];

export const searchInstruments = async (
  search: string
): Promise<SearchInstrumentsResponse> => {
  const { data, status, statusText } = await Axios.get(`search/instruments`, {
    params: {
      search,
    },
  });

  if (StatusCodeUtil.is_error(status)) {
    throw new Error(statusText);
  }

  return data;
};

export const useSearchInstruments = (search: string) =>
  useQuery<unknown, Error, SearchInstrumentsResponse>(
    ["search-instruments"],
    () => searchInstruments(search)
  );
