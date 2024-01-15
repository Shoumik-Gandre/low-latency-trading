import { TICKER } from "../constants";
import { asks } from "./asks.service";
import { bids } from "./bids.service";
import { exchangeService } from "./exchange.service";

export const limitOrderService = (side: string, price: number, quantity: number, userId: string): number => {
    let remainingQuantity = quantity;
    if (side === "bid") {
        for (let i = asks.length - 1; i >= 0; i--) {
            if (asks[i].price > price) {
                continue;
            }
            if (asks[i].quantity > remainingQuantity) {
                asks[i].quantity -= remainingQuantity;
                exchangeService(asks[i].userId, userId, TICKER, remainingQuantity, asks[i].price);
                return 0;
            } else {
                remainingQuantity -= asks[i].quantity;
                exchangeService(asks[i].userId, userId, TICKER, asks[i].quantity, asks[i].price);
                asks.pop();
            }
        }
    } else {
        for (let i = bids.length - 1; i >= 0; i--) {
            if (bids[i].price < price) {
                continue;
            }
            if (bids[i].quantity > remainingQuantity) {
                bids[i].quantity -= remainingQuantity;
                exchangeService(userId, bids[i].userId, TICKER, remainingQuantity, price);
                return 0;
            } else {
                remainingQuantity -= bids[i].quantity;
                exchangeService(userId, bids[i].userId, TICKER, bids[i].quantity, price);
                bids.pop();
            }
        }
    }

    return remainingQuantity;
}