const htmlparser = require('htmlparser2');

module.exports = function htmlToPlainText(html = '') {
  const result = [];
  const parser = new htmlparser.Parser({
    ontext: function(text){
      result.push(text);
    }
  }, { decodeEntities: true });
  parser.write(html);
  parser.end();
  return result.join('');
};
