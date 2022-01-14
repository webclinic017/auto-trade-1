import { useState } from "react";
import { useUpdateUserProfile } from "../../api/auth/updateUserProfile";
import { UserProfileUpdateForm } from "../../types/forms";
interface UserSettingsHooks {
  updateProfile: (profile: UserProfileUpdateForm) => Promise<void>;
  isUserUpdateFormSubmitDisabled: boolean;
}

export const useSettings = (): UserSettingsHooks => {
  const { mutateAsync: updateUserProfile } = useUpdateUserProfile();
  const [isUserUpdateFormSubmitDisabled, setIsUserUpdateFormSubmitDisabled] =
    useState(false);

  const updateProfile = async (
    profile: UserProfileUpdateForm
  ): Promise<void> => {
    setIsUserUpdateFormSubmitDisabled(true);
    try {
      await updateUserProfile(profile);
    } catch {
      alert("failed to update profile");
    }
    setIsUserUpdateFormSubmitDisabled(false);
  };

  return {
    updateProfile,
    isUserUpdateFormSubmitDisabled,
  };
};
