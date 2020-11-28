export function times<T>(n: number, item: T): T[] {
  const array: T[] = []
  for (let i = 0; i < n; i += 1) {
    array.push(item)
  }
  return array
}

export function findIndex<T>(array: T[], predicate: (e: T, index: number, array: T[]) => boolean): number {
  for (let i = 0, len = array.length; i < len; i += 1) {
    if (predicate(array[i], i, array)) {
      return i
    }
  }
  return -1
}

export function zip<A, B, C>(arrA: ReadonlyArray<A>, arrB: ReadonlyArray<B>, zipper: (a: A, b: B) => C): C[] {
  if (arrA.length !== arrB.length) {
    throwTypeError('length of the 2 arrays should be equal')
  }
  return arrA.map((a, index) => zipper(a, arrB[index]))
}

export function throwTypeError(message: string): never {
  throw new TypeError(message)
}

export function assert(condition: boolean, message: string): never | void {
  if (!condition) {
    throw new Error(message)
  }
}

export function isNil(input: any): boolean {
  return input === null || input === undefined
}

export function isValidEnumValue<T>(enumType: { [key: string]: T }, input: T): boolean {
  return Object.values(enumType).includes(input)
}

const DefaultEquality = (a: any, b: any) => a === b

export function arraysShallowEqual<T>(
  a: ReadonlyArray<T>,
  b: ReadonlyArray<T>,
  equality: (a: T, b: T) => boolean = DefaultEquality
): boolean {
  if (a === b) {
    return true
  }
  if (isNil(a) || isNil(b) || a.length !== b.length) {
    return false
  }
  const length = a.length
  for (let i = 0; i < length; i += 1) {
    if (!equality(a[i], b[i])) {
      return false
    }
  }
  return true
}
