import { OrderBook } from "./orderbook.service"


export const orderbooks: {[key: string]: OrderBook} = {
    "AAPL": new OrderBook(),
    "GOOG": new OrderBook(),
    "AMZN": new OrderBook(),
    "NVDA": new OrderBook(),
}