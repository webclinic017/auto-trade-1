import { Axios } from "..";
import { useQuery } from "react-query";
import { AxiosError } from "axios";

interface GetUserProfileReponse {
  user: string;
  api_key: string;
  api_secret: string;
  access_token: string;
  investment: number;
  max_loss: number;
  max_profit: number;
  nifty_lot: number;
  banknifty_lot: number;
}

const getUserProfile = async (): Promise<GetUserProfileReponse> => {
  const { data } = await Axios.get("/users/profile/detail");
  return data;
};

export const useGetUserProfile = () =>
  useQuery<unknown, AxiosError, GetUserProfileReponse>(
    ["get-user-profile"],
    getUserProfile,
    { retry: false }
  );
