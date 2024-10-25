# Memory Leaks in Node.js

> [!WARNING]  
> Some code in this repository is intentionally dumb. Some of it may even be unintentionally dumb. Do not learn how to write code from it.

## Prepare

[Instructions how to prepare are here](./preparation.md)

> [!TIP]  
> Try to avoid looking at the code in `./problems/` until you've tried to solve the exercises.

## Exercises

### 1. Instrument the server with basic heap snapshot capture

1.  Implement returning memory info
2.  Implement saving a heap snapshot to disk
3.  (optionally) Force Garbage Collector before taking the snapshot
4.  Try out writing heap snapshot on SIGUSR2
5.  (optionally) Implement returning the heap snapshot as a response

> [!TIP]  
> hints & spoilers: ./spoilers/v8.js  
> check out `leaks-node-instrumented-server` branch for a solution

### 2. Run the server and take a heap snapshot

#### Running the server

```
npm start
```

#### Triggering a leak

[visit a problem URL](http://localhost:3000/problem/01)
or heat it up with a load test

```
npm test http://localhost:3000/problem/01
```

It runs `autocannon`, which you should learn to use, but for now there's some settings that should work for the purpose of this exercise.

#### Finding the leak

- Try to avoid looking at the source code, at least at first.
- Using the implementation from #1, capture heap snapshots.
- There's art to figuring out when to capture them and how to analyze. You need two snapshots with enough time in between them to see the difference.

## Examples

`./examples/` contains some examples of memory leaks in Node.js. You can run and analyze them to get a feel for what you're looking for.

`./spoilers/autocannon_gql.sh` runs the graphql sample under load and captures heap snapshots, but feel free to try to figure it out yourself first.

## How to take heap snapshots

The thing nobody told you is you want to put effort into making sure the two snapshots you take only differ because of the leak you're looking for and not because of other factors.

### 😃

- run app
- snapshot
- run suspect code
- snapshot
- compare

### 😁

- run app
- warm up suspect code
- snapshot
- benchmark suspect code
- snapshot
- compare

### 🤯

- run app
- warm up suspect code
- snapshot
- benchmark suspect code
- snapshot
- benchmark suspect code
- snapshot
- compare the two later snapshots
