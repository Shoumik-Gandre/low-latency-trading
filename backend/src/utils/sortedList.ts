function sortedIndex(array: any[], value: number) {
    var low = 0,
        high = array.length;

    while (low < high) {
        var mid = (low + high) >>> 1;
        if (array[mid] < value) low = mid + 1;
        else high = mid;
    }
    return low;
}

export default class SortedList<ItemType> extends Array {

    sortedIndex(value: number, key: CallableFunction): number {
        let low = 0,
            high = this.length;
    
        while (low < high) {
            let mid = low + Math.floor((high - low) / 2);
            if (key(this[mid]) < value) low = mid + 1;
            else high = mid;
        }
        return low;
    }

    insertSorted(item: ItemType, key: (x: ItemType) => number = (x: any) => x): number {
        let insertionIndex = this.sortedIndex(key(item), key);
        this.splice(insertionIndex, 0, item);
        return this.length;
    }
}