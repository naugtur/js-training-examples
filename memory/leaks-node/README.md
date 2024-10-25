# Memory Leaks in Node.js

## Prepare

[Instructions how to prepare](./preparation.md)

## Exercises

### 1. Instrument the server with basic heap snapshot capture 

 1. Implement returning memory info
 2. Implement saving a heap snapshot to disk
 3. (optionally) Force Garbage Collector before taking the snapshot
 4. Try out writing heap snapshot on SIGUSR2
 5. (optionally) Implement returning the heap snapshot as a response

 > hints&spoilers: ./spoilers/v8.js
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
It runs `autocannon`, which you should learn to use, but for now there's some settings that should do.

#### Find the leak

- Try to avoid looking at the source code, at least at first.
- Using the implementation from #1, capture heap snapshots.  
- There's art to figuring out when to capture them and how to analyze. You need two snapshots with enough time in between them to see the difference. 

## Examples

`./examples/` contains some examples of memory leaks in Node.js. You can run and analyze them to get a feel for what you're looking for.

`./spoilers/autocannon_gql.sh` runs the graphql sample under load and captures heap snapshots, but feel free to try to figure it out yourself first.

## How to take heap snapshots

The thing nobody told you.

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

