const request = require('request');
const cheerio = require('cheerio');
const rp = require('request-promise');

const linkRE = /(HF|SF|SR)d*/;
// const url = 'https://www.revisor.mn.gov/bills/reference.php?session=238';
const url =
  'http://leginfo.legislature.ca.gov/faces/billSearchClient.xhtml?session_year=20152016&house=Both&author=All&lawCode=All';

request(url, (error, response, html) => {
  if (!error && response.statusCode === 200) {
    const $ = cheerio.load(html);

    const links = $('a');
    $(links).each((index, link) => {
      if (
        $(link)
          .text()
          .match(linkRE)
      ) {
        console.log($(link).text() + ':\n  ' + $(link).attr('href'));
      }
    });
  }
});
