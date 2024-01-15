import express from "express";
import { TICKER } from "../constants";
import { users } from "../services/users.service"


export const balanceController = (req: express.Request, res: express.Response) => {
    const userId = req.params.userId;
    const user = users.find(x => x.id === userId);
    if (!user) {
        return res.json({
            USD: 0,
            [TICKER]: 0
        })
    }
    res.json({ balances: user.balances });
}