const helpers = require("../helpers");

async function urlShortenController(req, res) {
  try {
    const fullUrl = req.body.url;
    const shortUrl = await helpers.saveShortUrl(fullUrl);
    const hostName = req.headers.host;
    const protocol = req.protocol;

    res.send({
      message: "URL shortened successfully",
      data: {
        url: `${protocol}://${hostName}/${shortUrl}`,
      },
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
}

async function redirectUrlController(req, res) {
  const hostName = req.headers.host;
  const shortUrl = req.params.shortUrl;
  const fullUrl = await helpers.getFullUrlByShortUrl(shortUrl);
  if (!fullUrl) {
    res.redirect(`${hostName}/`);
  } else {
    res.redirect(fullUrl);
  }
}

module.exports = {
  urlShortenController,
  redirectUrlController,
};
