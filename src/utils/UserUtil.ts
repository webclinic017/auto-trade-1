import { UserProfileUpdateForm } from "../types/forms";
import { UserProfile } from "../types/user";

export class UserUtil {
  public static getUserProfileUpdateForm = (
    profile: UserProfile
  ): UserProfileUpdateForm => {
    const updateProfileForm: UserProfileUpdateForm = {
      access_token: profile.access_token,
      api_key: profile.api_key,
      api_secret: profile.api_secret,
      banknifty_lot: profile.banknifty_lot,
      nifty_lot: profile.nifty_lot,
      investment: profile.investment,
      max_loss: profile.max_loss,
      max_profit: profile.max_loss,
    };

    return updateProfileForm;
  };
}
