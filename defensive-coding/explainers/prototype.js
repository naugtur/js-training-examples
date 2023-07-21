// =====================================================================

const print = (txt, obj) => {
  console.log(
    `> ${txt} 
  `,
    obj
  );
};
const recursive = (obj, path) => {
  if (!path) {
    path = [[obj, obj.constructor.name]];
  }
  const proto = Object.getPrototypeOf(obj);
  if (proto === null) {
    return path.concat("null");
  }
  path.push([proto, proto.constructor.name])
  return recursive(proto, path);
};

let a, b;

// =====================================================================

a = {
  hello: () => {},
};
b = Object.create(a);
b.helloB = () => {};

console.log("######################################################");

print("b", b);
print("a", a);
print("Object.prototype", Object.prototype);

print("b.__proto__", b.__proto__);
print("b.__proto__ === a", b.__proto__ === a);
print("a.__proto__", a.__proto__);
print("a.__proto__ === Object.prototype", a.__proto__ === Object.prototype);

print("b.hello", b.hello);
print("b.hello === a.hello", b.hello === a.hello);
print("b.hasOwnProperty", b.hasOwnProperty);
print(
  "b.hasOwnProperty === a.hasOwnProperty",
  b.hasOwnProperty === a.hasOwnProperty
);
print(
  "b.hasOwnProperty === Object.prototype.hasOwnProperty",
  b.hasOwnProperty === Object.prototype.hasOwnProperty
);

print("prototype chain", recursive(b));

// =====================================================================

class A {
  hello() {}
}

class B extends A {}

a = new A();
b = new B();

console.log("######################################################");

print("b", b);
print("a", a);
print("Object.prototype", Object.prototype);

print("b.__proto__", b.__proto__);
print("b.__proto__ === B.prototype", b.__proto__ === B.prototype);
print(
  "b.__proto__.__proto__ === A.prototype",
  b.__proto__.__proto__ === A.prototype
);
print("a.__proto__", a.__proto__);
print(
  "a.__proto__.__proto__ === Object.prototype",
  a.__proto__.__proto__ === Object.prototype
);

print("b.hello", b.hello);
print("b.hello === a.hello", b.hello === a.hello);
print("b.hasOwnProperty", b.hasOwnProperty);
print(
  "b.hasOwnProperty === a.hasOwnProperty",
  b.hasOwnProperty === a.hasOwnProperty
);
print(
  "b.hasOwnProperty === Object.prototype.hasOwnProperty",
  b.hasOwnProperty === Object.prototype.hasOwnProperty
);

print("prototype chain", recursive(b));
