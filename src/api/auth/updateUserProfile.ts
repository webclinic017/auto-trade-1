import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { Axios, queryClient } from "..";
import { LocalStorage } from "../../entities/localstorage";
import { UserProfileUpdateForm } from "../../types/forms";

type UpdateUserProfileRequest = UserProfileUpdateForm;

export const updateUserProfile = async (
  request: UpdateUserProfileRequest
): Promise<void> => {
  const { status } = await Axios.put(
    `/users/update/profile`,
    JSON.stringify(request),
    {
      headers: {
        Authorization: `Token ${LocalStorage.authToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (status !== 200) {
    throw new Error("unauthorized");
  }
};

export const useUpdateUserProfile = () =>
  useMutation<unknown, AxiosError, UpdateUserProfileRequest>(
    ["update-user-profile"],
    updateUserProfile,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("get-user-profile");
      },
    }
  );
