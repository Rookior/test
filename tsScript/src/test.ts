var a:Number =123

console.log(a)

function getFirst<T>(arr:T[]):T {
    return arr[0];
  }

  getFirst([1, 2, 3])


  function comb<T>(arr1:T[], arr2:T[]):T[] {
    return arr1.concat(arr2);
  }

  comb<number|string>([1, 2], ['a', 'b']) 

  interface Box<Type> {
    contents: Type;
  }
  
  let box:Box<string>;


  function comp<Type extends { length: number }>(a:Type, b:Type) {
    if (a.length >= b.length) {
      return a;
    }
    return b;
  }

  enum MyEnum {
    A = 'a',
    B = 'b'
  }
  
  // 'A'|'B'
  type Foo = keyof typeof MyEnum;