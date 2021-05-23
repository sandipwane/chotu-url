const express = require("express");
const router = express.Router();
const controller = require("../src/controllers");

// Show homepage
router.get("/", function (_req, res) {
  res.render("index", { title: "URL Shortner" });
});

// create a short url
router.post("/api/shorten", controller.urlShortenController);

// decode short url and redirect
router.get("/:shortUrl", controller.redirectUrlController);

module.exports = router;
