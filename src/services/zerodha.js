import { rest } from "../api";

const is_status_client_error = (status_code) => {
  return 400 <= status_code && status_code <= 499;
};

const is_status_server_error = (status_code) => {
  return 500 <= status_code && status_code <= 599;
};

// const is_status_success = (status_code) => {
//   return 200 <= status_code && status_code <= 299;
// };

export const make_order_request = (trade, position = Object()) => {
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
      }
    } else if (trade.tag === "EXIT") {
      trade.quantity = position.quantity;

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

      return resolve("success");
    }
  });
  return promise;
};
