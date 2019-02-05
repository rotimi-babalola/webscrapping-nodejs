const cheerio = require('cheerio');
const Rp = require('request-promise');

Rp.post({
  url: 'http://www.legis.ga.gov/Legislation/en-US/Search.aspx',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  formData: {
    'ctl00%24dropBillType': 'HB',
    'ctl00%24txtBillNumber': '',
    'ctl00%24SPWebPartManager1%24g_3ddc9629_a44e_4724_ae40_c80247107bd6%24ctl00':
      '',
    'ctl00%24SPWebPartManager1%24g_3ddc9629_a44e_4724_ae40_c80247107bd6%24Session': 26,
    'ctl00%24SPWebPartManager1%24g_33f3625e_6c75_461d_9f34_a0b68bb1996a%24ctl00': 27,
    'ctl00%24SPWebPartManager1%24g_33f3625e_6c75_461d_9f34_a0b68bb1996a%24Member': 0,
    'ctl00%24SPWebPartManager1%24g_9b925e59_b3ff_4dfe_976e_d5f4d0bca555%24ctl00': 27,
    'ctl00%24SPWebPartManager1%24g_9b925e59_b3ff_4dfe_976e_d5f4d0bca555%24Committee': 0,
    'ctl00%24SPWebPartManager1%24g_30b669e1_e435_4906_b0cf_c1da712558a1%24ctl00':
      '',
    'ctl00%24SPWebPartManager1%24g_30b669e1_e435_4906_b0cf_c1da712558a1%24Keywords':
      '',
    'ctl00%24SPWebPartManager1%24g_a13dbe47_2722_401e_abf8_42fa1d15ad2f%24ctl00':
      '',
    'ctl00%24SPWebPartManager1%24g_a13dbe47_2722_401e_abf8_42fa1d15ad2f%24Georgia+Code+Title': 0,
    'ctl00%24SPWebPartManager1%24g_01955938_e9ae_4ed5_8fa3_6b51beb9400b%24ctl00':
      '',
    'ctl00%24SPWebPartManager1%24g_01955938_e9ae_4ed5_8fa3_6b51beb9400b%24Bill+Type': 0,
    'ctl00%24SPWebPartManager1%24g_2cab3920_24b8_44c5_bff4_215b7b409b78%24ctl00':
      '',
    'ctl00%24SPWebPartManager1%24g_2cab3920_24b8_44c5_bff4_215b7b409b78%24Number':
      '',
    'ctl00%24SPWebPartManager1%24g_b223cc53_ceb0_41fe_85ca_0c60eb699ad8%24ctl00':
      '',
    'ctl00%24SPWebPartManager1%24g_b223cc53_ceb0_41fe_85ca_0c60eb699ad8%24ctl08': 0,
    'ctl00%24SPWebPartManager1%24g_b223cc53_ceb0_41fe_85ca_0c60eb699ad8%24ctl05': 1,
    'ctl00%24SPWebPartManager1%24g_9e40bb06_ca2e_45bc_8903_39fdf7143254%24ctl00': 27,
    'ctl00%24SPWebPartManager1%24g_07053ce9_076c_4986_b350_2954573c2ca7%24ctl00': 27,
  },
}).then(html => {
  const $ = cheerio.load(html);
  // console.log($.html());
  const links = $('a');
  $(links).each((index, link) => {
    console.log($(link).text());
  });
});
