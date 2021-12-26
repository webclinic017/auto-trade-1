export class LocalStorage {
  public static authToken: string = localStorage.getItem("@authToken") ?? "";
  public static setAuthToken = (token: string): void => {
    localStorage.setItem("@authToken", token);
  };
  public static clearAuthToken = (): void => {
    localStorage.removeItem("@authToken");
  };
}
