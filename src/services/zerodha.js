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
  let promise = new Promise(async (resolve, reject) => {
    const endpoint = rest.uri + trade.endpoint;
    const token = trade.token;

    if (trade.tag === "ENTRY") {
      console.log("market order started");
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

      console.log(margins_req.status);

      if (
        is_status_client_error(margins_req.status) ||
        is_status_server_error(margins_req.status)
      ) {
        return reject(new Error("margins error"));
      }

      const margins = await margins_req.json();
      const price = trade.ltp * trade.quantity;

      console.log(margins);

      if (price <= margins?.equity?.available?.live_balance / 2) {
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
          return reject(new Error("failed to place order"));
        }

        const position_req = await fetch(
          rest.position(trade.instrument_token),
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
            body: JSON.stringify(trade),
          }
        );

        if (is_status_success(position_req.status)) {
          return resolve("success");
        } else {
          return reject(new Error("position failure"));
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
        is_status_server_error(position_req.status) ||
        is_status_client_error(position_req.status)
      ) {
        return reject(new Error("position failure"));
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
        return reject(new Error("failed to place order"));
      }

      await fetch(rest.position(trade.instrument_token), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(trade),
      });

      return resolve("success");
    }
  });
  return promise;
};
