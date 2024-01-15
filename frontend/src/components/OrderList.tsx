import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { green, red } from '@mui/material/colors';
import { socket } from '../socket';
import { useEffect, useState } from 'react';

// function createRow(
//   price: number,
//   quantity: number,
// ) {
//   return { price, quantity, total: price * quantity }
// }

export default function OrderList() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  const [asks, setAsks] = useState([
    // createRow(50, 6),
    // createRow(40, 5),
    // createRow(30, 4),
    // createRow(20, 3),
    // createRow(10, 2),
  ]);
  const [bids, setBids] = useState([
    // createRow(10, 2),
    // createRow(20, 3),
    // createRow(30, 4),
    // createRow(40, 5),
    // createRow(50, 6),
  ]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      // setFooEvents(previous => [...previous, value]);
      setAsks(() => value.asks)
      setBids(() => value.bids)
    }
    socket.emit('orderlist');

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('orderlist', onFooEvent);
    
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('orderlist', onFooEvent);
    };
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Price&nbsp;($)</TableCell>
            <TableCell>Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {asks.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Typography color={red[600]}>{row.price}</Typography>
              </TableCell>
              <TableCell>{row.quantity}</TableCell>
            </TableRow>
          ))}
          {bids.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Typography color={green[600]}>{row.price}</Typography>
              </TableCell>
              <TableCell>{row.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}