import memoize from 'memoizee';

const featured = require('../../static/char-ref-featured.json');
const wordRegEx = memoize(word => new RegExp(word, 'i'));
const matchWordCount = (string = '', words = []) => {
  let matchCount = 0;
  for (let i = 0; i < words.length; i++) {
    const index = wordRegEx(words[i]).test(string);
    if (index) {
      matchCount ++;
    }
  }
  return matchCount;
};
const totalWordIndices = (string, words = []) => {
  let indicesTotal = 0;
  for (let i = 0; i < words.length; i++) {
    const idx = string.indexOf(words[i]);
    if (idx !== -1) {
      indicesTotal += idx;
    }
  }
  return indicesTotal;
};
function sortByRelevancy(a, b, words) {
  const testA = totalWordIndices(a.desc, words) + totalWordIndices(a.category, words);
  const testB = totalWordIndices(b.desc, words) + totalWordIndices(b.category, words);
  if (testA < testB) {
    return -1;
  }
  if (testA > testB) {
    return 1;
  }
  return 0;
}

const findMatches = (query, data, queryRe, words) => {
  const matchesByProp = data.filter(item => {
    return queryRe.test(item.character)
      || queryRe.test(item.hex)
      || queryRe.test(item.dec)
      || queryRe.test(item.named)
      || queryRe.test(item.css.slice(1));
  });
  const matchesByNameOrDesc = data.filter((item) =>
    !matchesByProp.includes(item) && (
      matchWordCount(item.desc, words) === words.length
      || matchWordCount(item.category, words) === words.length
    )
  );
  return matchesByProp.concat(matchesByNameOrDesc);
};

export default (data) => {
  const featuredGroup = [];
  const rest = [];
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (item.hex in featured) {
      featuredGroup.push(item);
    } else {
      rest.push(item);
    }
  }
  featuredGroup.sort(function byHexCode(a, b) {
    if (a.hex < b.hex) {
      return -1;
    }
    if (a.hex > b.hex) {
      return 1;
    }
    return 0;
  });
  return memoize((query) => {
    const escaped = query.replace(/[\\]/g, '');
    const queryRe = new RegExp(escaped, 'gi');
    const words = escaped.split(/\s/); // spaces and dashes
    const matches = findMatches(query, rest, queryRe, words)
      .sort((a, b) => sortByRelevancy(a, b, words));
    const featuredMatches = findMatches(query, featuredGroup, queryRe, words);
    return featuredMatches.concat(matches);
  });
};
