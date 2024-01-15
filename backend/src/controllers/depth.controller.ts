import express from "express";
import { depthService } from "../services/depth.service";


export const depthController = (req: express.Request, res: express.Response) => {
    let depth = depthService();
    res.json({
        depth
    });
} 