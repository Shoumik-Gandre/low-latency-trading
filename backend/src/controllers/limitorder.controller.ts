import express from "express";
import { placeLimitOrder } from "../services/limitOrder.service";
import { bids } from "../services/bids.service";
import { asks } from "../services/asks.service";
import { io } from "../app";
import { Side } from "../interfaces";
import { TICKER } from "../constants";


export const limitOrderController = (req: express.Request, res: express.Response) => {
    const side: string = req.body.side;
    const price: number = req.body.price;
    const quantity: number = req.body.quantity;
    const userId: string = req.body.userId; 
    const ticker: string = req.body.ticker;
    
    console.log(req.body);

    // Check if any above value is missing
    if (side == null || price == null || quantity == null || userId == null || ticker == null) {
        res.json({ error: 'request denied' })
        return;
    }

    let remainingQuantity = placeLimitOrder(
        {
            "price": Number(price),
            "quantity": Number(quantity),
            "userId": userId,
            "ticker": ticker
        }, 
        side.toLocaleLowerCase() === "bid" ? Side.Bid : Side.Ask,
        asks,
        bids
    )

    io.emit('orderlist', {
        asks: asks,
        bids: bids,    
    });

    res.json({
        filledQuantity: quantity - remainingQuantity,
    })
}
