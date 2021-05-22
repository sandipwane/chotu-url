const express = require("express");
const router = express.Router();
const helpers = require("../src/helpers/index");

// Show homepage
router.get("/", function (_req, res) {
  res.render("index", { title: "URL Shortner" });
});

// create a short url
router.post("/api/shorten", function (req, res) {
  const fullUrl = req.body.url;
  const shortUrl = helpers.saveShortUrl(fullUrl);
  const hostName = req.headers.host;
  res.send({
    message: "URL shortened successfully",
    data: {
      url: `${hostName}/${shortUrl}`,
    },
  });
});

// decode short url and redirect
router.get("/:shortUrl", function (req, res) {
  const hostName = req.headers.host;
  const shortUrl = req.params.shortUrl;
  const fullUrl = helpers.getFullUrlByShortUrl(shortUrl);
  if (!fullUrl) {
    res.redirect(`${hostName}/`);
  } else {
    res.redirect(fullUrl);
  }
});

module.exports = router;
