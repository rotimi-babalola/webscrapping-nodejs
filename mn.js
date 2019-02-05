const Cheerio = require('cheerio');
const getSource = require('./getSource');

class mnImporter {
  constructor() {
    this.data = null;
    this.baseUrl = 'https://www.revisor.mn.gov/bills/reference.php';
  }

  async identifySourceBills(sessionId) {
    if (sessionId > 250 || sessionId < 209) {
      return 'Invalid session, enter session id between 209 and 250';
    }
    const billsObject = {
      count: 0,
      bills: [],
    };
    this.data = await getSource(`${this.baseUrl}?session=${sessionId}`);
    const $ = Cheerio.load(this.data);

    // select tablerows
    const tableRowLinks = $('tr').find('a');
    let billIDs = [];
    $(tableRowLinks).each((index, element) => {
      // skip first 3 links of table because it contains headers
      // can this be better???
      if (!(index === 0 || index === 1 || index === 2)) {
        billIDs.push(
          $(element)
            .text()
            .trim()
        );
      }
    });

    billIDs = billIDs.filter(id => id.trim().length > 0);

    return {
      bills: billIDs,
      count: billIDs.length,
    };
  }
}

const mn = new mnImporter();
console.log(
  mn
    .identifySourceBills(238)
    .then(res => console.log(res))
    .catch(error => console.log(`Error ${error}`))
);
