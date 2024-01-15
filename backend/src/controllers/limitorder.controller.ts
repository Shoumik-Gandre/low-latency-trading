import express from "express";
import { limitOrderService } from "../services/limitOrder.service";
import { bids } from "../services/bids.service";
import { asks } from "../services/asks.service";
import { io } from "../app";


export const limitOrderController = (req: express.Request, res: express.Response) => {
    const side: string = req.body.side;
    const price: number = req.body.price;
    const quantity: number = req.body.quantity;
    const userId: string = req.body.userId; 
    
    console.log(req.body);

    // Check if any above value is missing
    if (side == null || price == null || quantity == null || userId == null) {
        res.json({ error: 'request denied' })
        return;
    }

    const remainingQty = limitOrderService(side, price, quantity, userId);

    if (remainingQty === 0) {
        io.emit('orderlist', {
            asks: asks,
            bids: bids,    
        });
        res.json({ filledQuantity: quantity });
        return;
    }

    if (side.toLocaleLowerCase() === "bid") {
        bids.push({
            userId,
            price,
            quantity: remainingQty
        });
        bids.sort((a, b) => a.price < b.price ? -1 : 1);
    } else {
        asks.push({
            userId,
            price,
            quantity: remainingQty
        })
        asks.sort((a, b) => a.price < b.price ? 1 : -1);
    }

    io.emit('orderlist', {
        asks: asks,
        bids: bids,    
    });

    res.json({
        filledQuantity: quantity - remainingQty,
    })
}