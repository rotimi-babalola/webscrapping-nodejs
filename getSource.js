const Rp = require('request-promise');
const Cheerio = require('cheerio');

const getSource = url =>
  Rp({ url }).then(html => {
    const $ = Cheerio.load(html);
    return $.html();
  });

module.exports = getSource;
