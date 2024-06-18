
//=========================================================
//
//   And what's the fun in that?
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//=========================================================

{
  // Synchronous trampoline
  function syncTrampoline(generatorFunc, ...args) {
    let iterator = generatorFunc(...args);
    let result = iterator.next();
    while (!result.done) {
      result = iterator.next(result.value);
    }
    return result.value;
  }

  // Asynchronous trampoline
  async function asyncTrampoline(generatorFunc, ...args) {
    let iterator = generatorFunc(...args);
    let result = iterator.next();
    while (!result.done) {
      const val = await result.value;
      result = iterator.next(val);
    }
    return result.value;
  }
}

// Same but with error propagation so that you can do error handling inside of your logic

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


export async function crawlAndProcessAsync(options) {
  return asyncTrampoline(crawlAndProcess, options);
}

export function crawlAndProcessSync(options) {
  return syncTrampoline(crawlAndProcess, options);
}

function* crawlAndProcess({
  url,
  filterURL,
  download,

  depth = 2,
  visited = new Set(),
  sitemap = {},
  memo = new Map(),
}) {
  if (depth < 1) return;
  if (visited.has(url)) return;
  visited.add(url);

  const html = yield download(url);

  // Extract URLs from the HTML content
  const urlRegex = /https:\/\/[^\s"'<]+/g;
  const urls = html.match(urlRegex) || [];

  // Filter URLs using the filterURL function and memoize results
  const filteredUrls = [];
  for (const url of urls) {
    if (!memo.has(url)) {
      const isAllowed = yield filterURL(url);
      memo.set(url, isAllowed);
    }
    if (memo.get(url)) {
      filteredUrls.push(url);
    }
  }

  // Add the current URL and its filtered URLs to the sitemap
  sitemap[url] = filteredUrls;

  // Recursively crawl filtered URLs
  for (const filteredUrl of filteredUrls) {
    yield* crawlAndProcess({
      url: filteredUrl,
      filterURL,
      download,
      depth: depth - 1,
      visited,
      sitemap,
      memo,
    });
  }

  return sitemap;
}
