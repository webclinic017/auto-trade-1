export interface UserCrenentials {
  username: string;
  password: string;
}

export interface UserProfile {
  user: string;
  api_key: string;
  api_secret: string;
  access_token: string;
  investment: number;
  max_loss: number;
  max_profit: number;
  nifty_lot: number;
  banknifty_lot: number;
  is_accesstoken_valid: boolean;
  zerodha_last_login: string;
}
