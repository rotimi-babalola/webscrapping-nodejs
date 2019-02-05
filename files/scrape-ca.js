const request = require('request');
const cheerio = require('cheerio');

const url =
  'http://leginfo.legislature.ca.gov/faces/billSearchClient.xhtml?session_year=20152016&house=Both&author=All&lawCode=All';

request(url, (error, response, html) => {
  if (!error && response.statusCode === 200) {
    const $ = cheerio.load(html);
    const billsObject = {
      bills: [],
    };

    const text = $('div[id=bill_returned]').text();
    const digits = text.match(/[0-9]+/g)[0];

    const tableLinks = $('table[id=bill_results]').find('a');
    $(tableLinks).each((index, link) => {
      billsObject.bills.push(
        $(link)
          .text()
          .trim()
      );
    });
    billsObject.count = tableLinks.length;
    // console.log(typeof billsObject.count, parseInt(digits, 10));
    // console.log(digits);
    console.log(billsObject);
    if (billsObject.count === parseInt(digits, 10)) {
      console.log('matched!!!');
    }
  }
});
