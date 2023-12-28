
const v8 = require('v8');

const stats = v8.getHeapSpaceStatistics()

v8.writeHeapSnapshot(/* file path optional */);

const stream = v8.getHeapSnapshot();
// Warning - it's a weird stream. 

// node --heapsnapshot-signal=SIGUSR2 index.js

// node --expose-gc index.js
// global.gc()

v8.setHeapSnapshotNearHeapLimit(limit)