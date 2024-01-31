import { users } from "./users.service";


export function exchangeService(userId1: string, userId2: string, ticker: string, quantity: number, price: number) {
    let user1 = users.find(x => x.id === userId1);
    let user2 = users.find(x => x.id === userId2);
    
    if (!user1 || !user2) {
        return;
    }

    user1.balances[ticker] -= quantity;
    user2.balances[ticker] += quantity;
    user1.balances["USD"] += (quantity * price);
    user2.balances["USD"] -= (quantity * price);
}

export const exchangeBalance = (sellerUserId: string, buyerUserId: string, ticker: string, quantity: number, price: number) => {
    let user1 = users.find(x => x.id === sellerUserId);
    let user2 = users.find(x => x.id === buyerUserId);
    
    if (!user1 || !user2) {
        return;
    }

    user1.balances[ticker] -= quantity;
    user2.balances[ticker] += quantity;
    console.log(`before | seller USD = ${user1.balances["USD"]}`);
    console.log(`before | buyer USD = ${user2.balances["USD"]}`);
    console.log(quantity);
    console.log(price);
    
    user1.balances["USD"] += (quantity * price);
    user2.balances["USD"] -= (quantity * price);

    console.log(`before | seller USD = ${user1.balances["USD"]}`);
    console.log(`before | buyer USD = ${user2.balances["USD"]}`);
}