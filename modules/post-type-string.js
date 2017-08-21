module.exports = (postCount) => {
  const plural = ((postCount > 1) || (postCount === 0)) ? 's' : '';
  return `article${plural}`;
};
