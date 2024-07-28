import { normalizeURL } from "./crawl.js";
import { test, expect } from "@jest/globals";

test("nomalizeURL protocol", () => {
  const input = "https://julio-dev.com.br/path";
  const actual = normalizeURL(input);
  const expected = "julio-dev.com.br/path";
  expect(actual).toBe(expected);
});

test("nomalizeURL slash", () => {
  const input = "https://julio-dev.com.br/path/";
  const actual = normalizeURL(input);
  const expected = "julio-dev.com.br/path";
  expect(actual).toBe(expected);
});

test("nomalizeURL capitals", () => {
  const input = "https://JULIO-dev.com.br/path";
  const actual = normalizeURL(input);
  const expected = "julio-dev.com.br/path";
  expect(actual).toBe(expected);
});

test("nomalizeURL http", () => {
  const input = "http://julio-dev.com.br/path";
  const actual = normalizeURL(input);
  const expected = "julio-dev.com.br/path";
  expect(actual).toBe(expected);
});
