const fs = require('fs');
const getCategory = require('general-category');
const he = require('he');
const charRefW3 = require('../static/char-ref-w3.json');
const charRefW3Hash = charRefW3.reduce((chars, entity) => {
  chars[entity.character] = entity;
  return chars;
}, {});
const chalk = require('chalk');

// [category reference](http://www.fileformat.info/info/unicode/category/index.htm)
const categories = ['Cc','Cf','Cn','Co','Cs','LC','Ll','Lm','Lo','Lt','Lu','Mc','Me','Mn','Nd','Nl','No','Pc','Pd','Pe','Pf','Pi','Po','Ps','Sc','Sk','Sm','So','Zl','Zp','Zs'];
const categoriesFull = ['Other, Control','Other, Format','Other, Not Assigned ','Other, Private Use','Other, Surrogate','Letter, Cased','Letter, Lowercase','Letter, Modifier','Letter, Other','Letter, Titlecase','Letter, Uppercase','Mark, Spacing Combining','Mark, Enclosing','Mark, Nonspacing','Number, Decimal Digit','Number, Letter','Number, Other','Punctuation, Connector','Punctuation, Dash','Punctuation, Close','Punctuation, Final quote ','Punctuation, Initial quote ','Punctuation, Other','Punctuation, Open','Symbol, Currency','Symbol, Modifier','Symbol, Math','Symbol, Other','Separator, Line','Separator, Paragraph','Separator, Space'];
const categoriesMapping = categories.reduce((mappings, c, i) => {
  // const [, categoryShorthand] = categoriesFull[i].split(', ');
  mappings[c] = categoriesFull[i];
  return mappings;
}, {
  Pe: 'Final quote'
});
const unicodeOrgList = categories.map(cat => {
  try {
    return require(`unicode/category/${cat}`);
  } catch(err) {
    return {};
  }
}).reduce((list, charsByUnicode) => {
  const keys = Object.keys(charsByUnicode);
  const entities = keys.map(k => {
    const {
      value: hex,
      name: desc,
      symbol: character,
      category
    } = charsByUnicode[k];
    return [
      '&#x' + hex + ';',
      desc.toLowerCase(),
      character,
      // named
      he.encode(character, { useNamedReferences: true }),
      he.encode(character, { decimal: true }),
      category
    ];
  }).filter(ent => {
    return !(ent[2] in charRefW3Hash);
  });
  return list.concat(entities);
}, []);

const columnDefs = ['hex', 'desc', 'character', 'named', 'dec', 'category'];
const normalizedCharRefW3 = charRefW3.map(ent => {
  return columnDefs.reduce((cols, colName, i) => {
    if (colName === 'category') {
      cols[i] = getCategory(ent.character);
    } else {
      cols[i] = ent[colName];
    }
    return cols;
  }, []);
});
const dataset = {
  categoriesMapping,
  columnDefs,
  mappings: normalizedCharRefW3
    .concat(
      unicodeOrgList.filter(entity => entity[5].match(/Sc|Sm/))
    )
};

console.log(
  dataset.mappings.find(entity => {
    return entity[2] === '“';
  })
);

fs.writeFile('./static/char-ref-full.json',
  JSON.stringify(dataset),
  (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(
      `${new Date().toISOString()}`,
      chalk.green('char-ref-full.json created')
    );
  }
);
