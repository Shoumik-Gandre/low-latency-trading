import express from "express";
import { bids } from "../services/bids.service";
import { asks } from "../services/asks.service";
import { html, io } from "../app";

export const orderlistController = async (req: express.Request, res: express.Response) => {

    console.log("asks");
    console.log(asks);
    console.log("bids");
    console.log(bids);
    
    res.json({
        asks: asks,
        bids: bids,
    })
} 