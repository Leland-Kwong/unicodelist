import memoize from 'memoizee';

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

const findMatches = (query, charRefData) => {
  const escaped = query.replace(/[\\]/g, '');
  const words = escaped.split(/\s/); // spaces and dashes
  const queryRe = new RegExp(escaped, 'gi');

  const matchesByProp = charRefData.filter(item => {
    return queryRe.test(item.character)
      || queryRe.test(item.hex)
      || queryRe.test(item.dec)
      || queryRe.test(item.named)
      || queryRe.test(item.css.slice(1));
  });
  const matchesByNameOrDesc = charRefData.filter((item) =>
    !matchesByProp.includes(item) && (
      matchWordCount(item.desc, words) === words.length
      || matchWordCount(item.category, words) === words.length
    )
  );
  return matchesByProp.concat(matchesByNameOrDesc)
    .sort((a, b) => sortByRelevancy(a, b, words));
};

export default (data) => {
  return memoize((query) => {
    const matches = findMatches(query, data);
    return matches;
  });
};
