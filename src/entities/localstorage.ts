import { queryClient } from "../api";

export class LocalStorage {
  public static setAuthToken = (token: string): void => {
    localStorage.setItem("@authToken", token);
  };
  public static clearAuthToken = (): void => {
    localStorage.removeItem("@authToken");

    queryClient.invalidateQueries("get-is-login");
  };

  public static get authToken(): string {
    return localStorage.getItem("@authToken") ?? "";
  }

  public static setRequestToken = (requestToken: string): void => {
    localStorage.setItem("@requestToken", requestToken);
  };

  public static clearRequestToken = (): void => {
    localStorage.removeItem("@requestToken");

    queryClient.invalidateQueries("get-user-profile");
    queryClient.invalidateQueries("get-margins");
    queryClient.invalidateQueries("get-pnl");
    queryClient.invalidateQueries("get-positions");
  };

  public static get requestToken(): string {
    return localStorage.getItem("@requestToken") ?? "";
  }

  public static get throttleCount(): number {
    return Number(localStorage.getItem("@throttleCount")) ?? 0;
  }

  public static setThrottleCount(val: number): void {
    localStorage.setItem("@throttleCount", String(val));
  }
}
