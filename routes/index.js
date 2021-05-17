var express = require("express");
var router = express.Router();

// Show homepage
router.get("/", function (_req, res) {
  res.render("index", { title: "Chotu URL" });
});

module.exports = router;
