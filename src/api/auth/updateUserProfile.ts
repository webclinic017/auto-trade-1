import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { Axios, queryClient } from "..";
import { LocalStorage } from "../../entities/localstorage";
import { UserProfileUpdateForm } from "../../types/forms";
import { StatusCodeUtil } from "../../utils/StatusCodeUtil";

type UpdateUserProfileRequest = UserProfileUpdateForm;

export const updateUserProfile = async (
  request: UpdateUserProfileRequest
): Promise<void> => {
  const { status, statusText } = await Axios.put(
    `/users/update/profile`,
    request,
    {
      headers: {
        Authorization: `Token ${LocalStorage.authToken}`,
      },
    }
  );

  if (StatusCodeUtil.is_error(status)) {
    throw new Error(statusText);
  }
};

export const useUpdateUserProfile = () =>
  useMutation<unknown, AxiosError, UpdateUserProfileRequest>(
    ["update-user-profile"],
    updateUserProfile,
    {
      onSuccess: () => {
        queryClient.refetchQueries("get-user-profile");
      },
    }
  );
