const request = require('request');
const cheerio = require('cheerio');

const linkRE = /(HF|SF|SR)d*/;

const getBillsObject = url => {
  // make request
  request(url, (error, response, html) => {
    if (error) {
      console.log(error);
      return error;
    }
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html);
      const billsObject = {
        count: 0,
        bills: [],
      };

      const links = $('a');
      $(links).each((index, link) => {
        if (
          $(link)
            .text()
            .match(linkRE)
        ) {
          billsObject.bills.push($(link).text());
          billsObject.count++;
        }
      });
      return billsObject;
    }
  });
};

const data = getBillsObject(
  'https://www.revisor.mn.gov/bills/reference.php?session=238'
);

console.log(data);
