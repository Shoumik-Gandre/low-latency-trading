import { Order } from "../../../src/interfaces";
import { placeMarketOrder } from "../../../src/services/marketOrder.service";

describe('market order tests bids on asks', () => {

    test('place market order of price 20', () => {
        const asks = [
            {
                side: "ask",
                price: 30,
                quantity: 1,
                userId: "1"
            },
            {
                side: "ask",
                price: 20,
                quantity: 4,
                userId: "1"
            },
            {
                side: "ask",
                price: 10,
                quantity: 8,
                userId: "1"
            },
        ]
        // asks.sort((a, b) => a.price < b.price ? 1 : -1);
        const bids: Order[] = [];

        placeMarketOrder(asks, bids, "bid", 10, "2")
        expect(asks).toEqual([
            {
                side: "ask",
                price: 30,
                quantity: 1,
                userId: "1"
            },
            {
                side: "ask",
                price: 20,
                quantity: 2,
                userId: "1"
            },
        ])
    })
})


describe('market order test for asks', () => {
    test('place market order of price 20', () => {
        const bids = [
            {
                side: "bid",
                price: 10,
                quantity: 8,
                userId: "1"
            },
            {
                side: "bid",
                price: 20,
                quantity: 4,
                userId: "1"
            },
            {
                side: "bid",
                price: 30,
                quantity: 1,
                userId: "1"
            },
        ]
        const asks: Order[] = [];
        placeMarketOrder(asks, bids, "ask", 10, "2")
        expect(bids).toEqual([
            {
                side: "bid",
                price: 20,
                quantity: 2,
                userId: "1"
            },
            {
                side: "bid",
                price: 30,
                quantity: 1,
                userId: "1"
            },
        ])
    })
})
