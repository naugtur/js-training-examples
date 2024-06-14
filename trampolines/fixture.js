export function inMemoryFetch(url) {
  const html = examplePages.get(url);
  if (!html) {
    throw new Error(`URL not found in examplePages: ${url}`);
  }
  return html;
}

export const examplePages = new Map([
  [
    "https://example.com",
    `<a href="https://example.com/page1">Page 1</a>
    <a href="https://localhost:8080/">You</a>
    <a href="https://naugtur.pl/">naugtur</a>`,
  ],
  [
    "https://example.com/page1",
    `<a href="https://example.com/page2">Page 2</a>`,
  ],
  [
    "https://example.com/page2",
    `<a href="https://example.com/page1">Page 1</a>`,
  ],
  ["https://example.com/page3", "No more links here."],
  ["https://naugtur.pl/", "Hello!"],
]);
