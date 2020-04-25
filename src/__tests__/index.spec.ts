import { extend } from './../index';
describe('test', () => {
  test('extend', () => {
    const a = {
      a: 'hello'
    }
    const b = {
      b: 'hank'
    }
    expect(extend(a, b)).toStrictEqual({"a": "hello", "b": "hank"})
  })
})