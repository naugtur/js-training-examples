export const makeScanner = ({ read, glob }) => {
  function* scan(path) {
    const pattern = `${path}/**/package.json`;
    const paths = yield glob(pattern);
    const authors = new Set();
    for (const path of paths) {
      const content = yield read(path, "utf8");
      const json = JSON.parse(content);
      if (json.author) {
        authors.add(getAuthor(json.author));
      }
    }
    return authors;
  }

  const isAsync = read.constructor.name === "AsyncFunction";
  if (isAsync) {
    return async (path) => asyncTrampoline(scan, path);
  } else {
    return (path) => syncTrampoline(scan, path);
  }
};

function getAuthor(au) {
  if (typeof au === "string") {
    return au.split(/[<(]/)[0].trim();
  } else if (typeof au === "object" && au.name) {
    return au.name;
  }
}

async function asyncTrampoline(generatorFunc, ...args) {
  const iterator = generatorFunc(...args);
  let result = iterator.next();
  while (!result.done) {
    try {
      const val = await result.value;
      result = iterator.next(val);
    } catch (error) {
      result = iterator.throw(error);
    }
  }
  return result.value;
}

function syncTrampoline(generatorFunc, ...args) {
  const iterator = generatorFunc(...args);
  let result = iterator.next();
  while (!result.done) {
    try {
      result = iterator.next(result.value);
    } catch (error) {
      result = iterator.throw(error);
    }
  }
  return result.value;
}
