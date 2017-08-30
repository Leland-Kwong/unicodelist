// const fs = require('fs');
// const featuredFixed = Object.keys(require('../static/char-ref-featured.json'))
//   .map(v => v.replace(/0/, ''))
//   .reduce((hash, v) => {
//     hash[v] = 1;
//     return hash;
//   }, {});
//
// console.log(featuredFixed);
//
// fs.writeFile(
//   './static/char-ref-featured.json',
//   JSON.stringify(featuredFixed),
//   (err) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log('done');
//   }
// );

console.log(
  require('../package.json')
);
