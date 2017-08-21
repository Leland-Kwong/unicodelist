const averageWPM = 200;
const defaults = {
  speed: averageWPM, // words per minute
  spaces: /\W+/g
};

function resolveOptions (options) {
  let no;
  const o = options;
  if (o === no) { return defaults; }
  if (o.speed === no) { o.speed = defaults.speed; }
  if (o.spaces === no) { o.spaces = defaults.spaces; }
  return options;
}

function _measureReadingTime (text, options) {
  const o = resolveOptions(options);
  const words = text.split(o.spaces).length;
  const seconds = Math.round(words / o.speed * 60);
  return seconds;
}

module.exports = _measureReadingTime;
