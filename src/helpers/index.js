// write code here
const { nanoid } = require("nanoid");
const validUrl = require("valid-url");
const db = require("../database");

const CODE_LENGTH = 6;

function generateShortIdForUrl() {
  return nanoid(CODE_LENGTH);
}

async function saveShortUrl(fullUrl) {
  if (!isValidURl(fullUrl)) {
    throw new Error("Invalid URL, Please try another");
  }
  const doc = await db.findOne({ fullUrl });
  if (doc) {
    return doc.shortUrl;
  }
  const shortUrl = generateShortIdForUrl();
  await db.insert({ fullUrl, shortUrl });

  return shortUrl;
}

async function getFullUrlByShortUrl(shortUrl) {
  const doc = await db.findOne({ shortUrl });
  return doc.fullUrl;
}

function isValidURl(url) {
  return validUrl.isUri(url);
}

module.exports = {
  saveShortUrl,
  getFullUrlByShortUrl,
};
