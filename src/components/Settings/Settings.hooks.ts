import { useState } from "react";
import { useUpdateUserProfile } from "../../api/auth/updateUserProfile";
import { UserProfileUpdateForm } from "../../types/forms";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";

interface UserSettingsHooks {
  updateProfile: (profile: UserProfileUpdateForm) => Promise<void>;
  isUserUpdateFormSubmitDisabled: boolean;
}

export const useSettings = (): UserSettingsHooks => {
  const { mutateAsync: updateUserProfile } = useUpdateUserProfile();
  const [isUserUpdateFormSubmitDisabled, setIsUserUpdateFormSubmitDisabled] =
    useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const updateProfile = async (
    profile: UserProfileUpdateForm
  ): Promise<void> => {
    setIsUserUpdateFormSubmitDisabled(true);
    try {
      await updateUserProfile(profile);

      enqueueSnackbar("successfully updated the profile", {
        variant: "success",
      });

      history.goBack();
    } catch (error: any) {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    }
    setIsUserUpdateFormSubmitDisabled(false);
  };

  return {
    updateProfile,
    isUserUpdateFormSubmitDisabled,
  };
};
