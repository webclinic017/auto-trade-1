import { Axios } from "..";
import { useQuery } from "react-query";
import { AxiosError } from "axios";
import { LocalStorage } from "../../entities/localstorage";
import { UserProfile } from "../../types/user";

type GetUserProfileReponse = UserProfile;

const getUserProfile = async (): Promise<GetUserProfileReponse> => {
  const { data } = await Axios.get("/users/profile/detail", {
    headers: {
      Authorization: `Token ${LocalStorage.authToken}`,
    },
  });
  return JSON.parse(data);
};

export const useGetUserProfile = () =>
  useQuery<unknown, AxiosError, GetUserProfileReponse>(
    ["get-user-profile"],
    getUserProfile,
    { retry: false }
  );
