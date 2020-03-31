var vntk = require('vntk');
var ner = vntk.ner();
const path = require('path');
const fs = require('fs');
const iob = require('../lib/iob')

const inputDataFolder = 'dataset/hanoi/postag-files';
const outputDataFolder = 'dataset/hanoi/dataturks-input-files';

const inputFileNames = [
    'postag-fb-01.txt'
];

inputFileNames.forEach((fileName) => {
    const inFile = path.join(__dirname, '..', inputDataFolder, fileName);
    console.log(`Input file: ${inFile}`);

    const content = fs.readFileSync(inFile)
        .toString()
        .replace(/\t/g, '#')
        .replace(/\n\n/g, '_n_')
        .replace(/\n/g, ' ')
        .replace(/_n_/g, ' _EndOfLine_\n');

    const outFile = path.join(__dirname, '..', outputDataFolder, fileName.replace('postag', 'dataturks-input'));
    console.log(`Output file: ${outFile}`);

    fs.writeFileSync(outFile, content);
});