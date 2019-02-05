// get billing info for minnesota
const request = require('request');
const cheerio = require('cheerio');
const Rp = require('request-promise');

const getBillInfo = url =>
  Rp({ url }).then(html => {
    const $ = cheerio.load(html);
    const billsObject = {
      count: 0,
      bills: [],
    };
    const linkRE = /(HF|SF|SR)d*/;

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
  });

// const x = Promise.resolve(bar).then(y => y);
// console.log(x);

class Test {
  constructor(url) {
    this.url = url;
  }
  async getBillInfo() {
    const html = await Rp({ url: this.url });
    // return Promise.resolve(billsObject);
    return html;
  }

  async getValue() {
    const x = await this.getBillInfo();
    return x;
  }
}

const y = new Test(
  'https://www.revisor.mn.gov/bills/reference.php?session=238'
);
const z = y.getValue();

const xxx = async () => {
  return await y.getValue();
};

console.log(xxx());
const getBillInfo = async url => {
  // const linkRE = /(HF|SF|SR)d*/;
  // const billsObject = {
  //   count: 0,
  //   bills: [],
  // };
  const html = await Rp({ url });
  // return Promise.resolve(billsObject);
  return html;

  // const $ = await cheerio.load(html);

  // const links = await $('a');
  // await $(links).each((index, link) => {
  //   if (
  //     $(link)
  //       .text()
  //       .match(linkRE)
  //   ) {
  //     billsObject.bills.push($(link).text());
  //     billsObject.count++;
  //   }
  // });
  // console.log(html, '>>>>>>>>>>>>>>');
  // return billsObject;
};

// console.log(foo());

// console.log(
//   getBillInfo('https://www.revisor.mn.gov/bills/reference.php?session=238')
// );

// const bar = await getBillInfo(
//   'https://www.revisor.mn.gov/bills/reference.php?session=238'
// );
// .then(data => {
//   return data;
// });

// console.log(bar);

// const foo = () => getBillInfo('https://www.revisor.mn.gov/bills/reference.php?session=238')
