import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { useStore } from "../context/StoreContext";

function Positions() {
  const [{ positions }] = useStore();

  return (
    <div className="p-3 mt-3">
      <h1 className="font-bold text-xl mb-3">Positions</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>id</strong>
              </TableCell>
              <TableCell>
                <strong>average price</strong>
              </TableCell>
              <TableCell>
                <strong>trading symbol</strong>
              </TableCell>
              <TableCell>
                <strong>pnl</strong>
              </TableCell>
              <TableCell>
                <strong>quantity</strong>
              </TableCell>
              {/* <TableCell>
                <strong>exit</strong>
              </TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {positions.map((item, id) => {
              return (
                <TableRow key={id}>
                  <TableCell>{id}</TableCell>
                  <TableCell>{item.average_price}</TableCell>
                  <TableCell>{item.tradingsymbol}</TableCell>
                  <TableCell>
                    <strong
                      className={`text-${
                        item.pnl < 0 ? "red-600" : "green-600"
                      }`}
                    >
                      {item.pnl}
                    </strong>
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  {/* <TableCell>
                    <button className="bg-red-600 px-5 py-2 rounded-md text-white font-bold">
                      exit
                    </button>
                  </TableCell> */}
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
