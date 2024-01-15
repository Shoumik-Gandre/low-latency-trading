import { Depth } from "../interfaces";
import { asks } from "./asks.service";
import { bids } from "./bids.service";


export const depthService = () => {
    const depth: Depth = {};

    // For bids
    for (let i = 0; i < bids.length; i++) {
        if (!depth[bids[i].price]) {
            depth[bids[i].price] = {
                quantity: bids[i].quantity,
                type: "bid"
            };
        } else {
            depth[bids[i].price].quantity += bids[i].quantity;
        }
    }

    // For asks
    for (let i = 0; i < asks.length; i++) {
        if (!depth[asks[i].price]) {
            depth[asks[i].price] = {
                quantity: asks[i].quantity,
                type: "ask"
            }
        } else {
            depth[asks[i].price].quantity += asks[i].quantity;
        }
    }

    return depth
}