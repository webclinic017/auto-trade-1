import { UserProfile } from "./user";

export type UserProfileUpdateForm = Omit<
  UserProfile,
  "id" | "is_accesstoken_valid" | "user" | "zerodha_last_login"
>;
