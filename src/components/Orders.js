import React, { useState, useEffect } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@material-ui/core";
import color from "tailwindcss/colors";
import LoadingScreen from "./LoadingScreen";

import { rest } from "../api";
import { useAuth } from "../context/AuthContext";

function Orders() {
  const [market_orders, setMarketOrders] = useState([]);
  const [limit_orders, setLimitOrders] = useState([]);
  const [is_loading, setIsLoading] = useState(true);
  const auth = useAuth();

  useEffect(() => {
    fetch(rest.market_api, {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("@authToken")}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMarketOrders(data);
      });

    fetch(rest.limit_api, {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("@authToken")}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setLimitOrders(data);
        setIsLoading(false);
      });
  }, []);

  if (is_loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="p-3">
      <h1 className="text-5xl font-serif">Orders</h1>
      <div className="p-2 mt-3">
        <div className="my-2">
          <h1 className="p-3">Market</h1>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>order id</strong>
                  </TableCell>
                  <TableCell>
                    <strong>trading symbol</strong>
                  </TableCell>
                  <TableCell>
                    <strong>exchagnge</strong>
                  </TableCell>
                  <TableCell>
                    <strong>quantity</strong>
                  </TableCell>
                  <TableCell>
                    <strong>action</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {market_orders?.results?.map((item) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>
                        <strong>{item.trading_symbol}</strong>
                      </TableCell>
                      <TableCell>{item.exchange}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        <Chip
                          label={item.action}
                          size="small"
                          style={{
                            background:
                              item.action === "BUY"
                                ? color.green[500]
                                : color.red[500],
                            color: "white",
                            fontWeight: "bold",
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="my-2">
          <h1 className="p-3">Limit</h1>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>order id</strong>
                  </TableCell>
                  <TableCell>
                    <strong>trading symbol</strong>
                  </TableCell>
                  <TableCell>
                    <strong>exchagnge</strong>
                  </TableCell>
                  <TableCell>
                    <strong>quantity</strong>
                  </TableCell>
                  <TableCell>
                    <strong>action</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {limit_orders?.results?.map((item) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>
                        <strong>{item.trading_symbol}</strong>
                      </TableCell>
                      <TableCell>{item.exchange}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        <Chip
                          label={item.action}
                          size="small"
                          style={{
                            background:
                              item.action === "BUY"
                                ? color.green[500]
                                : color.red[500],
                            color: "white",
                            fontWeight: "bold",
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default Orders;
