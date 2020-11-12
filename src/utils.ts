export function times<T>(n: number, item: T): T[] {
  const array: T[] = []
  for (let i = 0; i < n; i += 1) {
    array.push(item)
  }
  return array
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

export function arraysShallowEqual<T>(a: ReadonlyArray<T>, b: ReadonlyArray<T>): boolean {
  if (a === b) {
    return true
  }
  if (isNil(a) || isNil(b) || a.length !== b.length) {
    return false
  }
  const length = a.length
  for (let i = 0; i < length; i += 1) {
    if (a[i] !== b[i]) {
      return false
    }
  }
  return true
}
