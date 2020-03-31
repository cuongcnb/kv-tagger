var vntk = require('vntk');
var ner = vntk.ner();
const path = require('path');
const fs = require('fs');
const iob = require('../lib/iob')

const inputDataFolder = 'dataset/hanoi/dataturks-tsv-files';
const outputDataFolder = 'dataset/hanoi/train-files';

const inputFileNames = [
    'dataturks-fb-01.tsv'
];
const labels = ['LOC'];
const LENGTH = 3;

inputFileNames.forEach((fileName) => {
    const inFile = path.join(__dirname, '..', inputDataFolder, fileName);
    console.log(`Input file: ${inFile}`);

    const lines = fs.readFileSync(inFile)
        .toString()
        .replace(/#/g, '\t')
        .replace(/_EndOfLine_	O/g, '_EndOfLine_')
        .split('\n');

    let flag = {};
    labels.forEach(l => flag[l] = false);

    let preword = '';

    const iobLines = [];

    lines.forEach((line) => {
        let iobLine = line;
        let detectedLabel;

        let parts = line.split('\t');

        if (parts.length > 1 && parts.length < LENGTH) {
            preword = preword + (preword ? ' ' : '') + parts[0];
            return;
        }

        parts[0] = preword + (preword ? ' ' : '') + parts[0];
        preword = '';

        const index = labels.indexOf(parts[parts.length - 1].trim());
        detectedLabel = index >= 0 ? labels[index] : null;

        if (parts.length === LENGTH && detectedLabel) {
            parts[parts.length - 1] = flag[detectedLabel] ? 'I-' + detectedLabel : 'B-' + detectedLabel;
            iobLine = parts.join('\t');
        }

        labels.forEach(l => flag[l] = false);
        if (detectedLabel) {
            flag[detectedLabel] = true;
        }

        iobLines.push(parts.join('\t'));
    });

    const outFile = path.join(__dirname, '..', outputDataFolder, fileName.replace('dataturks', 'train').replace('tsv', 'txt'));
    console.log(`Output file: ${outFile}`);

    fs.writeFileSync(outFile, iobLines.join('\n').replace(/_EndOfLine_/g, ''));
});