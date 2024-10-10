function detector(obj) {
  function logStackTrace(message) {
    const stack = new Error().stack.split('\n');
    const relevantLine = stack[2];
    console.log(`${message} at: ${relevantLine.trim()}`);
  }

  return new Proxy(obj, {
    get(target, prop, receiver) {
      if (prop === 'then') {
        logStackTrace('async continuation');
      }
      return Reflect.get(target, prop, receiver);
    },
    
    has(target, prop) {
      if (prop === 'then') {
        logStackTrace('async continuation');
      }
      return Reflect.has(target, prop);
    },
    
    ownKeys(target) {
      logStackTrace('iteration or spread');
      return Reflect.ownKeys(target);
    }
  });
}

// Create an object
const myObject = {
  foo: 'bar',
  baz: 42
};

// Create a proxy for the object
const magic = detector(myObject);

// Async functions to pass the object through
async function level1(obj) {
  console.log("Entering level1");
  await new Promise(resolve => setTimeout(resolve, 100));
  return await level2(obj);
}

async function level2(obj) {
  console.log("Entering level2");
  await new Promise(resolve => setTimeout(resolve, 100));
  return await level3(obj);
}

async function level3(obj) {
  console.log("Entering level3");
  await new Promise(resolve => setTimeout(resolve, 100));
  for (let key in result) {
    result[key] = result[key] + 1;
  }
  return obj;
}

// Main function to orchestrate the async operations
async function main() {
  console.log("Starting main function");
  
  const result = await level1(magic);
  
  const spreadObj = { ...result };

}

main();