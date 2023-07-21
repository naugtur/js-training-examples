let f, f1, f2, f3, f4, f5, f6, f7, f8;
f = function (a, b) {
  console.log(`
  I got called with:
  `, [this, a, b]);
};

// what's bind?
const obj = { z: 0 };
obj.f = f;
obj.f(0);

f1 = f.bind(obj, 1, 11);
f1(100);
f2 = f.bind(2);
f2(22, 200);

// It's possible to keep a copy of bind
const { bind } = Function.prototype;

// now to use it
f3 = bind.call(f, 3);
f3(33, 300);

// but we want the first argument to be the this
f4 = function (thisArg, ...rest) {
  return bind.call(f, thisArg)(...rest);
};
f4(4, 44, 400);

// Choice of the moment when an argument value is decided
// doesn't affect the result, so we can bind the function f 
// to the bind call first and pass arguments later
f5 = function (thisArg, ...rest) {
  const thatBind = bind.call.bind(f);
  return thatBind(thisArg, ...rest);
};
f5(5, 55, 500);

// This is the same
f6 = function (thisArg, ...rest) {
  return bind.call(bind.call, f)(thisArg, ...rest);
};
f6(6, 66, 600);

// so to make it shorter:
f7 = bind.bind(bind.call)(f);
f7(7, 77, 700);
// Last but not least, make it a utility function
const uncurryThis = bind.bind(bind.call);
f8 = uncurryThis(f);
f8(8, 88, 800);
