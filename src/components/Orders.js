import React from "react";

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
import { useStore } from "../context/StoreContext";
import color from "tailwindcss/colors";

function Orders() {
  const [{ market_orders, limit_orders }] = useStore();

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
                {market_orders.map((item) => {
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
                {limit_orders.map((item) => {
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
