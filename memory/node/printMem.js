function delay(ms) {
    return new Promise(function(resolve) {
        setTimeout(resolve, ms)
    })
}

function printMemory() {
    global.gc();
    return delay(1000)
        .then(() => {
            console.log((process.memoryUsage().heapUsed / 1024).toFixed(0) + 'KB')
        })
}

module.exports = printMemory
