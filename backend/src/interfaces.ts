export interface Balances {
    [key: string]: number;
}


export interface User {
    id: string;
    balances: Balances;
}


export interface Order {
    userId: string;
    price: number;
    quantity: number;
}


export interface Depth {
    [price: string]: {
        type: "bid" | "ask",
        quantity: number,
    }
}