import { app, io, server } from "./app";
import { asks } from "./services/asks.service";
import { bids } from "./services/bids.service";

const PORT = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('orderlist', function(data) {
        io.emit('orderlist', {
            asks: asks,
            bids: bids,    
        });
     });
});

server.listen(PORT, () => console.log(`server started at http://localhost:${PORT}`))