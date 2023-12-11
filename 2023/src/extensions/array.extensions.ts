// declaration merging
declare global {
  interface Array<T> {
    indexOfCol(callbackfn: (value: T, index: number, array: [] ) =>  boolean, thisArg?: any): [][];
  }
}