import { UserProfile } from "./user";

export type UserProfileUpdateForm = Partial<
  Omit<
    UserProfile,
    "id" | "is_accesstoken_valid" | "user" | "zerodha_last_login"
  >
>;
