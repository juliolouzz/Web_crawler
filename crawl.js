import { JSDOM } from "jsdom";

function normalizeURL(url) {
  const urlObj = new URL(url);
  let fullPath = `${urlObj.host}${urlObj.pathname}`;
  if (fullPath.slice(-1) === "/") {
    fullPath = fullPath.slice(0, -1);
  }
  return fullPath;
}

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const anchors = dom.window.document.querySelectorAll("a");

  for (const anchor of anchors) {
    if (anchor.hasAttribute("href")) {
      let href = anchor.getAttribute("href");

      try {
        // convert any relative URLS to absolute
        href = new URL(href, baseURL).href;
        urls.push(href);
      } catch (err) {
        console.log(`${err.message}: ${href}`);
      }
    }
  }
  return urls;
}

async function fetchHTML(url) {
  // fetch and parse the html of the url
  let res;
  try {
    res = await fetch(url);
  } catch (err) {
    throw new Error(`Network error: ${err.message}`);
  }

  if (res.status > 399) {
    throw new Error(`HTTP error: ${res.status}`);
  }

  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("text/html")) {
    console.log(`Got non-HTML response: ${contentType}`);
  }

  return res.text();
}

// use defaultargs to prime the first call
async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
  // if this is an offsite URL, bail immediately
  const currentURLObj = new URL(currentURL);
  const baseURLObj = new URL(baseURL);
  if (currentURLObj.host !== baseURLObj.host) {
    return pages;
  }

  // use a consistent URL format
  const normalizedURL = normalizeURL(currentURL);

  // if we've already visited this page
  // just increase the count and do not repeat
  // the http request
  if (pages[normalizedURL] > 0) {
    pages[normalizedURL]++;
    return pages;
  }

  //initialize this page in the map
  //since it doesn't exist yet
  pages[normalizedURL] = 1;

  // fetch the html of the currentURL
  console.log(`crawling: ${currentURL}...`);
  let html = "";
  try {
    html = await fetchHTML(currentURL);
  } catch (error) {
    console.log(`${error.message}`);
    return pages;
  }

  // recur through the pages's links
  const nextURLs = getURLsFromHTML(html, baseURL);
  for (const nextURL of nextURLs) {
    pages = await crawlPage(baseURL, nextURL, pages);
  }

  return pages;
}

export { normalizeURL, getURLsFromHTML, crawlPage };
