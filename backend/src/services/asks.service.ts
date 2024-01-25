import { Order } from "../interfaces";
import SortedList from "../utils/sortedList";

// export const asks: Order[] = [];

/**
 * AskList is sorts its elements in a descending manner
 */
export class AsksList extends SortedList<Order> {
    insertSorted(item: Order): number {
        return super.insertSorted(item, (x: Order) => -x.price);
    }
};

export const asks = new AsksList();