var path = require('path');

/**
 * Import specs
 */
var dir = '../test/tagger/';
[
  'ner'
].forEach((script) => {
  require(path.join(dir, script));
});