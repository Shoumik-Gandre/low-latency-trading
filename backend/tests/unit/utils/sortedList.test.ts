import SortedList from '../../../src/utils/sortedList';


describe('Sorted List testing', () => {
    test('check insertSorted on Empty List', () => {
        let sl = new SortedList();
        sl.insertSorted(10)
        expect(sl).toEqual([10]);
    });

    test('check insertSorted on Sorted List', () => {
        let sl = new SortedList();
        sl.insertSorted(10);
        sl.insertSorted(-1);
        sl.insertSorted(100);
        sl.insertSorted(5);
        expect(sl).toEqual([-1, 5, 10, 100]);
    });

    test('check insertSorted on Sorted List with key', () => {
        let sl = new SortedList();
        sl.insertSorted({a: 10, b: 1}, (x: any) => x.a);
        sl.insertSorted({a: -1, b: 2}, (x: any) => x.a);
        sl.insertSorted({a: 100, b: 2}, (x: any) => x.a);
        sl.insertSorted({a: 5, b: 2}, (x: any) => x.a);
        expect(sl).toEqual([{a: -1, b: 2}, {a: 5, b: 2}, {a: 10, b: 1}, {a: 100, b: 2}]);
    })

    test('check insertSorted on Sorted List with reversed key', () => {
        let sl = new SortedList();
        sl.insertSorted({a: 10, b: 1}, (x: any) => -x.a);
        sl.insertSorted({a: -1, b: 2}, (x: any) => -x.a);
        sl.insertSorted({a: 100, b: 2}, (x: any) => -x.a);
        sl.insertSorted({a: 5, b: 2}, (x: any) => -x.a);
        expect(sl).toEqual([{a: 100, b: 2}, {a: 10, b: 1}, {a: 5, b: 2}, {a: -1, b: 2}]);
    })
})