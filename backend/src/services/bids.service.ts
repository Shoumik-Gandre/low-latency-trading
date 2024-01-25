import { Order } from '../interfaces';
import SortedList from '../utils/sortedList';

// export const bids: Order[] = [];

/**
 * BidsList is sorts its elements in a descending manner
 */
export class BidsList extends SortedList<Order> {
    insertSorted(item: Order): number {
        return super.insertSorted(item, (x: Order) => -x.price);
    }
};

export const bids = new BidsList();