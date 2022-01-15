export class StatusCodeUtil {
  public static is_informational(code: number) {
    return 100 <= code && code <= 199;
  }

  public static is_success(code: number) {
    return 200 <= code && code <= 299;
  }

  public static is_redirect(code: number) {
    return 300 <= code && code <= 300;
  }

  public static is_client_error(code: number) {
    return 400 <= code && code <= 499;
  }

  public static is_server_error(code: number) {
    return 500 <= code && code <= 599;
  }

  public static is_error(code: number) {
    return (
      StatusCodeUtil.is_client_error(code) ||
      StatusCodeUtil.is_server_error(code)
    );
  }
}
