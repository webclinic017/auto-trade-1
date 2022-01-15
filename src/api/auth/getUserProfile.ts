import { Axios } from "..";
import { useQuery } from "react-query";
import { AxiosError } from "axios";
import { LocalStorage } from "../../entities/localstorage";
import { UserProfile } from "../../types/user";
import { StatusCodeUtil } from "../../utils/StatusCodeUtil";

type GetUserProfileReponse = UserProfile;

const getUserProfile = async (): Promise<GetUserProfileReponse> => {
  const { data, status, statusText } = await Axios.get(
    "/users/profile/detail",
    {
      headers: {
        Authorization: `Token ${LocalStorage.authToken}`,
      },
    }
  );

  if (StatusCodeUtil.is_error(status)) {
    throw new Error(statusText);
  }

  return data;
};

export const useGetUserProfile = () =>
  useQuery<unknown, AxiosError, GetUserProfileReponse>(
    ["get-user-profile"],
    getUserProfile,
    { retry: false }
  );
