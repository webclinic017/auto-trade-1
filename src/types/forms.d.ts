import { UserProfile } from "./user";

export type UserProfileUpdateForm = Partial<
  Omit<
    UserProfile,
    "id" | "is_accesstoken_valid" | "user" | "zerodha_last_login"
  >
>;

export interface INode {
  value: string;
  left_child: INode | undefined;
  right_child: INode | undefined;
}

export interface INodeForm {
  root: INode | undefined;
}
