var vntk = require('vntk');
var ner = vntk.ner();
const path = require('path');
const fs = require('fs');
const iob = require('../lib/iob');

const inputDataFolder = 'dataset/hanoi/raw-files';
const outputDataFolder = 'dataset/hanoi/postag-files';

const inputFileNames = [
    'raw-fb-01.txt'
];

inputFileNames.forEach((fileName) => {
    const inFile = path.join(__dirname, '..', inputDataFolder, fileName);
    console.log(`Input file: ${inFile}`);

    const seperate = '\n';

    const sentences = fs.readFileSync(inFile)
        .toString()
        .replace(/\\n/g, seperate)
        .replace(/\\t/g, '')
        .split(seperate)
        .filter(s => s);

    console.log(`Total sentences = ${sentences.length}`);

    const sents = [];
    sentences.forEach((s) => {
        const tags = ner.tag(s);
        sents.push(tags.map(tag => [
            tag[0],
            tag[1],
            // tag[2], 
            // tag[3]
        ]));
    });

    const outFile = path.join(__dirname, '..', outputDataFolder, fileName.replace('raw', 'postag'));
    console.log(`Output file: ${outFile}`);

    iob.saveFile(sents, outFile)
        .then(() => {
            console.log(`DONE ${fileName}`);
        })
        .catch((err) => {
            console.error(err);
        })
});