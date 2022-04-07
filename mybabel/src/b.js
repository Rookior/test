console.log(123)

var obj = Object.assign({ sex: 'male' }, {
  name: 'wzy'
})
console.log(obj)

var { a, b, ...c } = {
  a: 1,
  b: 2,
  c: 3,
  d: 4
}