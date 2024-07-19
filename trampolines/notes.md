---
marp: true
theme: gaia
class: 
 - lead
 - invert
paginate: true
headingDivider: 4
---


## Trampolines

![](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmJ6NHAwMHVpdm5ycGVzNDhnemR1NWlnNzBqMGZnd2J3aXlqbjM0eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/n4FpwV0JxhYjtBjn4U/giphy.gif)

## Async is infectious

## Reasons to be async
- non-blocking I/O
- eventloop model
- can consume both sync and async resources

## Reasons to be sync
- test mocking and runtime is easier (eg. fake file systems)
- CommonJS (require support and implementation)
- esposing a feature for strictly synchronous needs
- can be faster when no parallelism


## How did I learn this? 
my usecase and story


## Generators
```js
const foo = function* () {
  yield 'a';
  yield 'b';
  yield 'c';
};

let str = '';
for (const val of foo()) {
  str = str + val;
}

console.log(str); // "abc"

// Alternatively:
const i = foo()
console.log(i.next().value) // "a"
console.log(i.next()) // Object { value: "b", done: false }


```

## Why is it called a trampoline?

```js
  async function asyncTrampoline(generatorFunc, ...args) {
    let iterator = generatorFunc(...args);
    let result = iterator.next();
    while (!result.done) {
      const val = await result.value;
      result = iterator.next(val);
    }
    return result.value;
  }

```
## [Trampoline in action](./diagram.md)
