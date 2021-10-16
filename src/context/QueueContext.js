import React, { createContext, useState, useEffect, useContext } from "react";
import { make_order_request } from "../services/zerodha";
import { useAuth } from "../context/AuthContext";
import { sockuser } from "../services/ws";

export const QueueContext = createContext();

export const QueueProvider = ({ children }) => {
  const [queueBuy, setQueueBuy] = useState([]);
  const [lockBuy, setLockBuy] = useState(false);
  const [queueSell, setQueueSell] = useState([]);
  const [lockSell, setLockSell] = useState(false);
  const auth = useAuth();

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

  const sendPositionReq = () => {
    sockuser.send(
      JSON.stringify({ api_key: auth.api_key, access_token: auth.access_token })
    );
  };

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
          sendPositionReq();
          setLockBuy(false);
        })
        .catch((err) => {
          console.log(err);
          sendPositionReq();
          setLockBuy(false);
        });
    }
  }, [
    queueBuy,
    queueBuy.length,
    lockBuy,
    auth.api_key,
    auth.access_token,
    sendPositionReq,
  ]);

  useEffect(() => {
    // check for the length of the queue
    console.log(queueSell);
    if (queueSell.length > 0 && lockSell === false) {
      let queue_ = queueSell;
      setLockSell(true);

      // get the trade object from the queue
      const [trade, position] = queue_.shift();
      setQueueSell(queue_);
      make_order_request(trade, position)
        .then((txt) => {
          console.log(txt);
          sendPositionReq();
          setLockSell(false);
        })
        .catch((err) => {
          console.log(err);
          sendPositionReq();
          setLockSell(false);
        });
    }
  }, [
    queueSell,
    queueSell.length,
    lockSell,
    auth.api_key,
    auth.access_token,
    sendPositionReq,
  ]);

  return (
    <QueueContext.Provider value={{ pushBuy, pushSell }}>
      {children}
    </QueueContext.Provider>
  );
};

export const useQueue = () => useContext(QueueContext);
