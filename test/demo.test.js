/**
 * @description test demo
 * @author hayho
 */

 function sum (a, b) {
     return a + b
 }
 test('1 + 2 应该不等于4', () => {
     const res  = sum(1, 2)
     expect(res).not.toBe(4)
 })