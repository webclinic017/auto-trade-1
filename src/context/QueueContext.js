import React, { createContext, useState, useEffect, useContext } from "react";
import { make_order_request } from "../services/zerodha";
import { useStore } from "../context/StoreContext";
import { useAuth } from "../context/AuthContext";
import { rest } from "../api";

export const QueueContext = createContext();

export const QueueProvider = ({ children }) => {
  const [queueBuy, setQueueBuy] = useState([]);
  const [lockBuy, setLockBuy] = useState(false);
  const [queueSell, setQueueSell] = useState([]);
  const [lockSell, setLockSell] = useState(false);
  const auth = useAuth();

  const [, dispatch] = useStore();

  const pushBuy = (trade) => {
    if (queueBuy.length <= 10) {
      setQueueBuy((q) => {
        return [...q, trade];
      });
    }
  };

  const pushSell = (trade) => {
    setQueueSell((q) => {
      return [...q, trade];
    });
  };

  useEffect(() => {
    fetch(rest.positions, {
      method: "GET",
      headers: {
        Authorization: `Token ${auth.auth_token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((positions) => {
        dispatch({
          type: "UPDATE_POSITIONS",
          positions: positions,
        });
      });
  }, []);

  useEffect(() => {
    // check for the length of the queue
    console.log(queueBuy);
    if (queueBuy.length > 0 && lockBuy === false) {
      let queue_ = queueBuy;
      setLockBuy(true);

      // get the trade object from the queue
      const trade = queue_.shift();
      setQueueBuy(queue_);
      make_order_request(trade)
        .then((txt) => {
          console.log(txt);
          return fetch(rest.positions, {
            method: "GET",
            headers: {
              Authorization: `Token ${trade.token}`,
            },
          });
        })
        .then((res) => {
          return res.json();
        })
        .then((positions) => {
          setLockBuy(false);
          dispatch({
            type: "UPDATE_POSITIONS",
            positions: positions,
          });
        })
        .catch((err) => {
          console.log(err);
          setLockBuy(false);
        });
    }
  });

  useEffect(() => {
    // check for the length of the queue
    console.log(queueSell);
    if (queueSell.length > 0 && lockSell === false) {
      let queue_ = queueSell;
      setLockSell(true);

      // get the trade object from the queue
      const trade = queue_.shift();
      setQueueSell(queue_);
      make_order_request(trade)
        .then((txt) => {
          console.log(txt);
          return fetch(rest.positions, {
            method: "GET",
            headers: {
              Authorization: `Token ${trade.token}`,
            },
          });
        })
        .then((res) => {
          return res.json();
        })
        .then((positions) => {
          setLockSell(false);
          dispatch({
            type: "UPDATE_POSITIONS",
            positions: positions,
          });
        })
        .catch((err) => {
          console.log(err);
          setLockSell(false);
        });
    }
  });

  return (
    <QueueContext.Provider value={{ pushBuy, pushSell }}>
      {children}
    </QueueContext.Provider>
  );
};

export const useQueue = () => useContext(QueueContext);
