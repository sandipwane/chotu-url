const express = require("express");
const router = express.Router();
const helpers = require("../src/helpers/index");

// Show homepage
router.get("/", function (_req, res) {
  res.render("index", { title: "URL Shortner" });
});

// create a short url
router.post("/api/shorten", async function (req, res) {
  try {
    const fullUrl = req.body.url;
    const shortUrl = await helpers.saveShortUrl(fullUrl);
    const hostName = req.headers.host;

    res.send({
      message: "URL shortened successfully",
      data: {
        url: `${hostName}/${shortUrl}`,
      },
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// decode short url and redirect
router.get("/:shortUrl", async function (req, res) {
  const hostName = req.headers.host;
  const shortUrl = req.params.shortUrl;
  const fullUrl = await helpers.getFullUrlByShortUrl(shortUrl);
  if (!fullUrl) {
    res.redirect(`${hostName}/`);
  } else {
    res.redirect(fullUrl);
  }
});

module.exports = router;
