const webdriver = require('selenium-webdriver');
const cheerio = require('cheerio');
SeleniumServer = require('selenium-webdriver/remote').SeleniumServer;

async function basicExample() {
  const driver = new webdriver.Builder().forBrowser('firefox').build();
  const linkRE = /(HB|HR|SB|SR)\s[0-9a-z]+/gi;
  try {
    await driver.get('http://www.legis.ga.gov/Legislation/en-US/Search.aspx');
    const foo = await driver
      .findElement(
        webdriver.By.css(
          // '#ctl00_SPWebPartManager1_g_3ddc9629_a44e_4724_ae40_c80247107bd6_Session > option'
          '#ctl00_SPWebPartManager1_g_3ddc9629_a44e_4724_ae40_c80247107bd6_Session > option:nth-child(3)'
        )
      )
      .click();

    driver.getPageSource().then(function(html) {
      const $ = cheerio.load(html);
      const links = $('a');
      const option = $(
        'select[name="ctl00$SPWebPartManager1$g_b223cc53_ceb0_41fe_85ca_0c60eb699ad8$ctl05"]'
      );

      console.log(option.children().length);

      $(links).each((index, link) => {
        if (
          $(link)
            .text()
            .match(linkRE)
        ) {
          console.log($(link).text());
        }
      });
    });
    // console.log(htmlString, '>>>');
    driver.quit();
  } catch (error) {
    console.error(error.stack);
    driver.quit();
  }
}

basicExample();

// const { Builder, By, Key, until } = require('selenium-webdriver');

// (async function example() {
//   let driver = await new Builder().forBrowser('firefox').build();
//   try {
//     await driver.get('http://www.google.com/ncr');
//     await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
//     await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
//   } finally {
//     await driver.quit();
//   }
// })();
