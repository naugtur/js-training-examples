import dns from "dns/promises";
import { crawlAndProcessAsync, crawlAndProcessSync } from "./crawler.js";
import { inMemoryFetch } from "./fixture.js";

const deny = ["127.0.0.1", "192.168.0.1", "localhost"];

function basicDenyFilter(url) {
  const domain = new URL(url).hostname;
  return !deny.includes(domain);
}

async function dnsDenyFilter(url) {
  const domain = new URL(url).hostname;
  try {
    const addresses = await dns.resolve(domain);
    const isDenied = addresses.some((address) => deny.includes(address));
    if (!isDenied) {
      return true;
    }
  } catch (error) {
    console.error(`DNS lookup failed for ${domain}:`, error);
  }
  return false;
}

// Example usage with DNS lookup filter and actual fetch
const sitemap1 = await crawlAndProcessAsync({
  url: "https://example.com",
  filterURL: dnsDenyFilter,
  download: (url) => fetch(url).then((response) => response.text()),
});
console.log(sitemap1);

// Synchronous usage in a faked environment
const sitemap2 = crawlAndProcessSync({
  url: "https://example.com",
  filterURL: basicDenyFilter,
  download: inMemoryFetch,
});
console.log(sitemap2);
