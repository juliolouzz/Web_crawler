import { normalizeURL, getURLsFromHTML } from "./crawl.js";
import { test, expect } from "@jest/globals";

// tests for normalizeURL

test("nomalizeURL protocol", () => {
  const input = "https://blog.boot.dev/path";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toBe(expected);
});

test("nomalizeURL slash", () => {
  const input = "https://blog.boot.dev/path/";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toBe(expected);
});

test("nomalizeURL capitals", () => {
  const input = "https://BLOG.boot.dev/path";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toBe(expected);
});

test("nomalizeURL http", () => {
  const input = "http://blog.boot.dev/path";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toBe(expected);
});

// tests for getURLsFromHTML

test("getURLsFromHTML Links", () => {
  const input = `
    <html>
      <body>
        <a href="https://blog.boot.dev/path1">path1</a>
        <a href="https://blog.boot.dev/path2">path2</a>
        <a href="https://blog.boot.dev/path3">path3</a>
      </body>
    </html>
  `;
  const baseURL = "https://blog.boot.dev";
  const actual = getURLsFromHTML(input, baseURL);
  const expected = [
    "https://blog.boot.dev/path1",
    "https://blog.boot.dev/path2",
    "https://blog.boot.dev/path3",
  ];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML no links", () => {
  const input = `
    <html>
      <body>
        <p>no links</p>
      </body>
    </html>
  `;
  const baseURL = "https://blog.boot.dev";
  const actual = getURLsFromHTML(input, baseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML Links with other links", () => {
  const input = `
    <html>
      <body>
        <a href="https://blog.boot.dev/path1">path1</a>
        <a href="https://blog.boot.dev/path2">path2</a>
        <a href="https://blog.boot.dev/path3">path3</a>
        <a href="https://other.boot.dev/path4">path4</a>
      </body>
    </html>
  `;
  const baseURL = "https://blog.boot.dev";
  const actual = getURLsFromHTML(input, baseURL);
  const expected = [
    "https://blog.boot.dev/path1",
    "https://blog.boot.dev/path2",
    "https://blog.boot.dev/path3",
    "https://other.boot.dev/path4",
  ];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML Links with relative links", () => {
  const input = `
    <html>
      <body>
        <a href="/path1">path1</a>
        <a href="/path2">path2</a>
        <a href="/path3">path3</a>
      </body>
    </html>
  `;
  const baseURL = "https://blog.boot.dev";
  const actual = getURLsFromHTML(input, baseURL);
  const expected = [
    "https://blog.boot.dev/path1",
    "https://blog.boot.dev/path2",
    "https://blog.boot.dev/path3",
  ];
  expect(actual).toEqual(expected);
});
