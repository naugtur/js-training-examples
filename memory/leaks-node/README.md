


### 1. Instrument the server with basic heap snapshot capture 

 1. Implement returning memory info
 2. Implement saving a heap snapshot to disk
 3. (optionally) Force Garbage Collector before taking the snapshot
 4. Try out writing heap snapshot on SIGUSR2
 5. (optionally) Implement returning the heap snapshot as a response

 > hints&spoilers: ./spoilers/v8.js

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