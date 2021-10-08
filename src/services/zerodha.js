import { rest } from "../api";

const is_status_client_error = (status_code) => {
  return 400 <= status_code && status_code <= 499;
};

const is_status_server_error = (status_code) => {
  return 500 <= status_code && status_code <= 599;
};

const is_status_success = (status_code) => {
  return 200 <= status_code && status_code <= 299;
};

export const make_order_request = (trade) => {
  console.log("market order started");
  return new Promise(async (resolve, reject) => {
    const endpoint = rest.uri + trade.endpoint;
    const token = trade.token;

    if (trade.tag === "ENTRY") {
      const margins_req = await fetch(rest.margins, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          api_key: trade.api_key,
          access_token: trade.access_token,
        }),
      });

      if (
        is_status_client_error(margins_req.status) ||
        is_status_server_error(margins_req.status)
      ) {
        reject("failure");
        throw new Error("margins error");
      }

      const margins = await margins_req.json();
      const price = trade.ltp * trade.quantity;

      if (price <= margins?.equity?.avaliable?.cash / 1.5) {
        const req = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(trade),
        });

        if (
          is_status_client_error(req.status) ||
          is_status_server_error(req.status)
        ) {
          reject("failure");
          throw new Error("failed to place order");
        }

        const position_req = await fetch(
          rest.position(trade.instrument_token),
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
            body: JSON.stringify(trade),
          }
        );

        if (is_status_success(position_req)) {
          resolve("success");
          return;
        } else {
          reject("failure");
          return;
        }
      }
    } else if (trade.tag === "EXIT") {
      // check if the position exists
      const position_req = await fetch(rest.position(trade.instrument_token), {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (
        is_status_server_error(position_req) ||
        is_status_client_error(position_req.status)
      ) {
        reject("failed");
        throw new Error("position failure");
      }

      const position = await position_req.json();
      trade.quantity = position.quantity <= 2000 ? position.quantity : 2000;
      const request = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trade),
      });

      if (
        is_status_client_error(request.status) ||
        is_status_server_error(request.status)
      ) {
        reject("failure");
        throw new Error("failed to place order");
      }

      await fetch(rest.position(trade.instrument_token), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(trade),
      });
    }
  });
};
