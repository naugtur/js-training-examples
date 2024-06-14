export async function crawlAndProcessAsync(options) {
  return crawlAndProcess(options);
}

export function crawlAndProcessSync(options) {
  return crawlAndProcess(options);
}

async function crawlAndProcess({
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

  const html = await download(url);

  // Extract URLs from the HTML content
  const urlRegex = /https:\/\/[^\s"'<]+/g;
  const urls = html.match(urlRegex) || [];

  // Filter URLs using the filterURL function and memoize results
  const filteredUrls = [];
  for (const url of urls) {
    if (!memo.has(url)) {
      const isAllowed = await filterURL(url);
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
    await crawlAndProcess({
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