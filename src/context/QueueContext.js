import React, { createContext, useState, useEffect, useContext } from "react";
import { make_order_request } from "../services/zerodha";
import { useStore } from "../context/StoreContext";
import { rest } from "../api";

export const QueueContext = createContext();

export const QueueProvider = ({ children }) => {
  const [queue, setQueue] = useState([]);
  const [lock, setLock] = useState(false);
  const [, dispatch] = useStore();

  const push = (trade) => {
    setQueue((q) => {
      return [...q, trade];
    });
  };

  useEffect(() => {
    fetch(rest.positions, {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("@authToken")}`,
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
    // console.log(queue);
    if (queue.length > 0 && lock === false) {
      let queue_ = queue;
      setLock(true);

      // get the trade object from the queue
      const trade = queue_.shift();
      setQueue(queue_);
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
          setLock(false);
          dispatch({
            type: "UPDATE_POSITIONS",
            positions: positions,
          });
        })
        .catch((err) => {
          console.log(err);
          setLock(false);
        });
    }
  }, [queue, lock]);

  return (
    <QueueContext.Provider value={{ push }}>{children}</QueueContext.Provider>
  );
};

export const useQueue = () => useContext(QueueContext);
