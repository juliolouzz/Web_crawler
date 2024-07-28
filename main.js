import { crawlPage } from "./crawl.js";
import { printReport } from "./report.js";

async function main() {
  if (process.argv.length < 3) {
    console.log("no website URL provided");
    return;
  }
  if (process.argv.length > 3) {
    console.log("too many arguments");
    return;
  }
  const baseURL = process.argv[2];

  console.log(`crawling: ${baseURL}...`);

  const pages = await crawlPage(baseURL);

  printReport(pages);
}

main();
