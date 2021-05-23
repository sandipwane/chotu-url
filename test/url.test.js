process.env.NODE_ENV = "test";

const request = require("supertest-as-promised");
const { assert } = require("chai");
const app = require("../app");

const db = [];

describe("Url", () => {
  describe("POST /api/shorten", () => {
    const URL =
      "https://medium.com/@xoor/jwt-authentication-service-44658409e12c";
    it(`It should short the url: ${URL}`, (done) => {
      request(app)
        .post("/api/shorten")
        .send({
          url: URL,
        })
        .expect(200)
        .then((res) => {
          // validate short url
          const url = res.body.data.url;
          const shortId = url.split("/").slice(-1)[0];
          assert.lengthOf(shortId, 6);
          assert.notMatch(shortId, /\\<>{} /);
          // validate response message
          assert.equal(res.body.message, "URL shortened successfully");
          db.push({
            fullUrl: URL,
            shortUrl: url,
          });
          done();
        });
    });

    it(`It should return same short url: for ${URL}`, (done) => {
      request(app)
        .post("/api/shorten")
        .send({
          url: URL,
        })
        .expect(200)
        .then((res) => {
          const url = res.body.data.url;
          const responseShortId = url.split("/").slice(-1)[0];
          const doc = db.find((doc) => doc.fullUrl === URL);
          const storedShortUrl = doc.shortUrl.split("/").slice(-1)[0];
          assert.equal(responseShortId, storedShortUrl);
          done();
        });
    });
  });
});
