var vntk = require('vntk');
var ner = vntk.ner();
const path = require('path');
const fs = require('fs');
const iob = require('./lib/iob')

const sentences = fs.readFileSync(path.join(__dirname, 'dataset/hanoi/postag-fb-01.txt'))
    .toString()
    .replace(/\t/g, '#')
    .replace(/\n\n/g, '_n_')
    .replace(/\n/g, ' ')
    .replace(/_n_/g, ' _EndOfLine_\n');

const outFile = path.join(__dirname, 'dataset/hanoi/rawpostag-fb-01.txt');
console.log('Saving file: ' + outFile);

fs.writeFileSync(outFile, sentences);