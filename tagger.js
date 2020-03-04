'use strict';
const vntk = require('vntk');

const tagger = vntk.ner('./models/model.bin');

exports.tag = function (filename) {
    tagger.tag(filename);
}