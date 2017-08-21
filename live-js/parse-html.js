const fs = require('fs');
const { promisify } = require('util');
const cheerio = require('cheerio');

async function parseHTML() {
  const charRefHTML = await promisify(fs.readFile)('./static/char-ref.html', 'utf-8')
    .catch(err => console.log(err));
  return charRefHTML;
}

const normalize = {
  desc: (value) => {
    return value.toLowerCase();
  },
  default: (value) => value
};
parseHTML().then(res => {
  const $ = cheerio.load(res);
  const data = [];
  $('tr').each((i, elem) => {
    const metadata = {};
    $(elem).children().each((i, elem) => {
      const key = $(elem).attr('class');
      const value = (normalize[key] || normalize.default)($(elem).text());
      metadata[key] = key === 'character' ? value.slice(1) : value;
    });
    data.push(metadata);
  });
  promisify(fs.writeFile)('./static/char-ref-w3.json', JSON.stringify(data))
    .then(() => console.log(`[WRITTEN] - './static/char-ref-w3.json'`))
    .catch(err => console.log(err));
});
