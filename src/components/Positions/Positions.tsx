import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { useAuth } from "../../context/AuthContext";

function Positions() {
  const { positions } = useAuth();

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
            </TableRow>
          </TableHead>
          <TableBody>
            {positions?.net?.map((item, id) => {
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
