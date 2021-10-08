import React, { createContext, useState, useEffect, useContext } from "react";
import { make_order_request } from "../services/zerodha";

export const QueueContext = createContext();

export const QueueProvider = ({ children }) => {
  const [queue, setQueue] = useState([]);
  const [lock, setLock] = useState(false);

  const push = (trade) => {
    setQueue((q) => {
      return [...q, trade];
    });
  };

  useEffect(() => {
    console.log(queue);
  }, [queue]);

  useEffect(() => {
    // check for the length of the queue
    if (queue.length > 0 && lock === false) {
      let queue_ = queue;
      setLock(true);

      // get the trade object from the queue
      const trade = queue_.shift();
      setQueue(queue_);
      make_order_request(trade)
        .then((txt) => {
          console.log(txt);
          setLock(false);
        })
        .catch((err) => {
          console.log(err);
          setLock(false);
        });
    }
  });

  return (
    <QueueContext.Provider value={{ push }}>{children}</QueueContext.Provider>
  );
};

export const useQueue = () => useContext(QueueContext);
