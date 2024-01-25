import { TICKER } from "../constants";
import { Order } from "../interfaces";
import { exchangeBalance, exchangeService } from "./exchange.service";

export const placeMarketOrder = (
    asks: Order[],
    bids: Order[],
    side: "bid" | "ask",
    quantity: number,
    userId: string
) => {
    /*
    A market order is an order to buy or sell a stock at the market's current best available price
    */

    let remainingQuantity = quantity;

    if (side == 'bid') {
        
        // buy all the available stock with the quantity
        for (let i = asks.length - 1; i >= 0; i--) {
            exchangeBalance(asks[i].userId, userId, TICKER, Math.min(remainingQuantity, asks[i].quantity), asks[i].price);
            
            if (remainingQuantity < asks[i].quantity) {
                asks[i].quantity -= remainingQuantity;
                break
            } else {
                remainingQuantity -= asks[i].quantity
                asks.pop()
            }
        }
    } else {

        for (let i = 0; i < bids.length; i++) {
            // console.log(bids[i])
            // exchangeBalance(userId, bids[i].userId, TICKER, Math.min(remainingQuantity, bids[i].quantity), bids[i].price);
            
            if (remainingQuantity < bids[i].quantity) {
                bids[i].quantity -= remainingQuantity;
                break
            } else {
                remainingQuantity -= bids[i].quantity
                bids.pop()
            }
        }

    }
}