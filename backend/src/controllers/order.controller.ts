import express from "express";
import { html } from "../app";

export const orderController = async (req: express.Request, res: express.Response) => {
    res.sendFile(html + 'limitorder.html');
} 