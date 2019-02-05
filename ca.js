const Cheerio = require('cheerio');
const getSource = require('./getSource');

class caImporter {
  constructor() {
    this.data = null;
    this.baseUrl =
      'http://leginfo.legislature.ca.gov/faces/billSearchClient.xhtml';
  }

  async identifySourceBills(sessionId) {
    this.data = await getSource(
      `${
        this.baseUrl
      }?session_year=${sessionId}&house=Both&author=All&lawCode=All`
    );

    const billIDs = [];

    const $ = Cheerio.load(this.data);
    // get Bills Returned text
    const text = $('div[id=bill_returned]').text();
    // extract digits
    const billsReturnedNumber = text.match(/[0-9]+/g)[0];

    const tableLinks = $('table[id=bill_results]').find('a');
    $(tableLinks).each((index, link) => {
      billIDs.push(
        $(link)
          .text()
          .trim()
      );
    });

    // compare
    if (parseInt(billsReturnedNumber, 10) === billIDs.length) {
      console.log('Matched!!!');
    }

    return {
      bills: billIDs,
      count: billIDs.length,
    };
  }
}

const ca = new caImporter();
console.log(
  ca
    .identifySourceBills(19992000)
    .then(res => console.log(res))
    .catch(error => console.log(`Error ${error}`))
);
