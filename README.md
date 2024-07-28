# Web Crawler Project

## Overview

This project is a Web Crawler built in JavaScript using Node.js. The primary objective is to generate an "internal links" report for any website by crawling each page of the site. This helps improve SEO by ensuring that pages are internally linked properly.

## Setup

### Prerequisites

- A code editor (e.g., VS Code).
- A command line interface (CLI). Instructions are provided for Mac OS/Linux using Bash. For Windows, WSL 2 is recommended.
- NVM (Node Version Manager) installed.

### Installation

1. Clone the repository:

   ```
   git clone <repository_url>
   cd <repository_directory>
   ```

2. Install Node.js using NVM:

   ```
   nvm use
   ```

3. Install project dependencies:
   ```
   npm install
   ```

### Running the Project

1. Start the application:
   ```
   npm start <BASE_URL>
   ```
   Replace `<BASE_URL>` with the root URL of the website you want to crawl. For example:
   ```
   npm start https://example.com
   ```

## Project Structure

- `main.js`: Entry point of the application. Processes command line arguments and starts the crawling process.
- `crawl.js`: Contains functions for normalizing URLs, extracting URLs from HTML, and crawling pages recursively.
- `report.js`: Contains the function to generate and print the internal links report.
- `crawl.test.js`: Contains tests for the functions in `crawl.js`.

## How It Works

1. **Normalize URLs**: The `normalizeURL` function ensures that different variations of the same URL are treated as the same.
2. **Extract URLs**: The `getURLsFromHTML` function parses the HTML of a page and extracts all anchor tag URLs.
3. **Crawl Pages**: The `crawlPage` function recursively fetches pages, extracts URLs, and keeps track of the number of times each URL is found.
4. **Generate Report**: The `printReport` function sorts the URLs by the number of inbound links and prints a formatted report.

## Extending the Project

Consider extending the project with the following features:

- Run the script on a timer and deploy it to a server, emailing the report periodically.
- Add error handling for larger sites.
- Count external links and include them in the report.
- Save the report as a CSV file.
- Use a graphics library to visualize links between pages.
- Make concurrent requests to speed up the crawling process.

## Contributing

Feel free to fork the repository and submit pull requests. Contributions are welcome!

## License

This project is licensed under the MIT License.
