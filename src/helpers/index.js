// write code here
const { nanoid } = require("nanoid");

const CODE_LENGTH = 6;

const db = [];

function generateShortIdForUrl() {
  return nanoid(CODE_LENGTH);
}

function saveShortUrl(fullUrl) {
  const shortUrl = generateShortIdForUrl();

  const doc = db.find((doc) => doc.fullUrl === fullUrl);
  if (doc) {
    return doc.shortUrl;
  }
  db.push({ fullUrl, shortUrl });

  return shortUrl;
}

function getFullUrlByShortUrl(shortUrl) {
  const doc = db.find((doc) => doc.shortUrl === shortUrl);
  return doc.fullUrl;
}

module.exports = {
  saveShortUrl,
  getFullUrlByShortUrl,
};
