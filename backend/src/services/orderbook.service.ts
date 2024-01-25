import { AsksList } from "./asks.service";
import { BidsList } from "./bids.service";

export class OrderBook {
    public asks: AsksList;
    public bids: BidsList;

    constructor(asks?: AsksList, bids?: BidsList) {
        this.asks = asks ?? new AsksList();
        this.bids = bids ?? new BidsList();
    }
}