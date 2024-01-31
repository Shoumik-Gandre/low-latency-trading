import { Order, Side } from "../interfaces";
import { AsksList } from "./asks.service";
import { BidsList } from "./bids.service";
import { exchangeBalance } from "./exchange.service";


export const placeLimitOrderBid = (order: Order, asks: AsksList, bids: BidsList): number => {

    // Start with the lowest ask price, if ask price is less than bid price, perform an exchange
    let remainingQuantity = order.quantity;
    for (let i = asks.length - 1; i >= 0 && remainingQuantity > 0; i--) {
        let currentSmallestAsk = asks[i];

        if (currentSmallestAsk.price > order.price) {
            // Since asks is sorted descendingly, any value after the current will be higher than the current ask
            break;
        }

        exchangeBalance(
            currentSmallestAsk.userId,
            order.userId,
            order.ticker,
            Math.min(remainingQuantity, currentSmallestAsk.quantity),
            currentSmallestAsk.price
        );

        if (currentSmallestAsk.quantity > remainingQuantity) {
            currentSmallestAsk.quantity -= remainingQuantity;
            remainingQuantity = 0;
            break;
        } else {
            remainingQuantity -= currentSmallestAsk.quantity;
            asks.pop();
        }
    }

    // If any quntity of order remains, insert it into the bids
    if (remainingQuantity > 0) {
        bids.insertSorted({
            ...order,
            "quantity": remainingQuantity
        })
    }

    return remainingQuantity;
}

export const placeLimitOrderAsk = (order: Order, asks: AsksList, bids: BidsList): number => {
    let remainingQuantity = order.quantity;

    for (let currentHighestBid of bids) {

        if (remainingQuantity === 0) {            
            break;
        }

        if (currentHighestBid.price < order.price) {
            // Since bids is sorted descendingly, any value after the current will be less than the current Bid
            break;
        }

        exchangeBalance(
            order.userId,
            currentHighestBid.userId,
            order.ticker,
            Math.min(remainingQuantity, currentHighestBid.quantity),
            currentHighestBid.price
        );


        if (currentHighestBid.quantity > remainingQuantity) {
            currentHighestBid.quantity -= remainingQuantity;
            remainingQuantity = 0;
            break;
        } else {
            remainingQuantity -= currentHighestBid.quantity;
            bids.splice(0, 1);
        }

    }

    // If any quntity of order remains, insert it into the asks
    if (remainingQuantity > 0) {
        asks.insertSorted({
            ...order,
            "quantity": remainingQuantity
        })
    }

    return remainingQuantity;
}


export const placeLimitOrder = (order: Order, side: Side, asks: AsksList, bids: BidsList): number => {
    if (side === Side.Bid) {
        return placeLimitOrderBid(order, asks, bids);
    } else if (side === Side.Ask) {
        return placeLimitOrderAsk(order, asks, bids)
    } else throw Error("Unknown Side in ")
}
