export const makeScanner = ({ read, glob }) => {
  async function scan(path) {
    const pattern = `${path}/**/package.json`;
    const paths = await glob(pattern);
    const authors = new Set();
    for (const path of paths) {
      const content = await read(path, "utf8");
      const json = JSON.parse(content);
      if (json.author) {
        authors.add(getAuthor(json.author));
      }
    }
    return Array.from(authors).sort();
  }

  return scan;
};

function getAuthor(au) {
  if (typeof au === "string") {
    return au.split(/[<(]/)[0];
  } else if (typeof au === "object" && au.name) {
    return au.name;
  }
}

/*====================
  = SPOILERS below, don't look
  =
  =
  =
  =
  =
  =
  =
  =
  =
  =
  =
  =
  =
  =
  =*/
function spoiler(){
  const isAsync = read.constructor.name === "AsyncFunction";
  if (isAsync) {
    return async (path) => asyncTrampoline(scan, path);
  } else {
    return (path) => syncTrampoline(scan, path);
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
