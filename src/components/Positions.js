import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { rest } from "../api";

function Positions() {
  const [positions, setPositions] = useState([]);

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
      .then((data) => {
        setPositions(data);
      });
  }, []);

  return (
    <div className="p-3 mt-3">
      <h1 className="font-bold text-xl mb-3">Positions</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>entry price</TableCell>
              <TableCell>trading symbol</TableCell>
              <TableCell>price</TableCell>
              <TableCell>quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {positions.map((item) => {
              return (
                <TableRow>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.entry_price}</TableCell>
                  <TableCell>{item.trading_symbol}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Positions;
