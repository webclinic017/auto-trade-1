import { Axios } from "..";
import { useQuery } from "react-query";
import { AxiosError } from "axios";
import { LocalStorage } from "../../entities/localstorage";

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
  is_accesstoken_valid: boolean;
  zerodha_last_login: string;
}

const getUserProfile = async (): Promise<GetUserProfileReponse> => {
  const { data } = await Axios.get("/users/profile/detail", {
    headers: {
      Authorization: `Token ${LocalStorage.authToken}`,
    },
  });
  return data;
};

export const useGetUserProfile = () =>
  useQuery<unknown, AxiosError, GetUserProfileReponse>(
    ["get-user-profile"],
    getUserProfile,
    { retry: false }
  );
