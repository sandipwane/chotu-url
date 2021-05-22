// write code here
const { nanoid } = require("nanoid");
const db = require("../database");


const CODE_LENGTH = 6;

function generateShortIdForUrl() {
  return nanoid(CODE_LENGTH);
}

async function saveShortUrl(fullUrl) {
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

module.exports = {
  saveShortUrl,
  getFullUrlByShortUrl,
};
