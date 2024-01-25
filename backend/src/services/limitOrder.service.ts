import { TICKER } from "../constants";
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
            currentSmallestAsk
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
            currentHighestBid
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


/* Deprecated */
// export const limitOrderService = (side: string, price: number, quantity: number, userId: string): number => {
//     let remainingQuantity = quantity;
//     if (side === "bid") {
//         for (let i = asks.length - 1; i >= 0; i--) {
//             if (asks[i].price > price) {
//                 continue;
//             }
//             if (asks[i].quantity > remainingQuantity) {
//                 asks[i].quantity -= remainingQuantity;
//                 exchangeService(asks[i].userId, userId, TICKER, remainingQuantity, asks[i].price);
//                 return 0;
//             } else {
//                 remainingQuantity -= asks[i].quantity;
//                 exchangeService(asks[i].userId, userId, TICKER, asks[i].quantity, asks[i].price);
//                 asks.pop();
//             }
//         }
//     } else {
//         for (let i = bids.length - 1; i >= 0; i--) {
//             if (bids[i].price < price) {
//                 continue;
//             }
//             if (bids[i].quantity > remainingQuantity) {
//                 bids[i].quantity -= remainingQuantity;
//                 exchangeService(userId, bids[i].userId, TICKER, remainingQuantity, price);
//                 return 0;
//             } else {
//                 remainingQuantity -= bids[i].quantity;
//                 exchangeService(userId, bids[i].userId, TICKER, bids[i].quantity, price);
//                 bids.pop();
//             }
//         }
//     }

//     return remainingQuantity;
// }
