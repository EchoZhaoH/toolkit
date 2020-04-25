export const extend = <T extends object, U extends object>(
  a: T,
  b: U
): T & U => {
  for (const key in b) {
    ;(a as any)[key] = b[key]
  }
  return a as any
}

const hasOwnProperty = Object.prototype.hasOwnProperty

export const hasOwn = (val: object, key: string | symbol): key is keyof typeof val => {
  return hasOwnProperty.call(val, key)
}

export const isArray = Array.isArray
export const isFunction = (val: unknown): val is Function => {
  return typeof val === 'function'
}
export const isString = (val: unknown): val is string => typeof val === 'string'
export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'
export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'

export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

export const objectToString = Object.prototype.toString
export const toTypeString = (value: unknown): string =>
  objectToString.call(value)

export const isPlainObject = (val: unknown): val is object =>
  toTypeString(val) === '[object Object]'

// for converting {{ interpolation }} values to displayed strings.
export const toDisplayString = (val: unknown): string => {
  return val == null
    ? ''
    : isArray(val) || (isPlainObject(val) && val.toString === objectToString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}
