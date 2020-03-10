var vntk = require('vntk');
var ner = vntk.ner();
const path = require('path');
const fs = require('fs');
const iob = require('./lib/iob')

function readLines(path, sep = '\n') {
    let array = fs.readFileSync(path)
        .toString()
        .replace(/\\n/g, sep)
        .replace(/\\t/g, '')
        .split(sep)
        .filter(s => s);
    return array;
}

const sentences = readLines(path.join(__dirname, 'dataset/hanoi/raw-fb-01.txt'));

let content = '';
const sents = [];
sentences.forEach((s) => {
    // console.log(s);
    const tags = ner.tag(s);
    // tags.forEach((tag) => {
    //     content += tag.join('\t') + '\n';
    // })
    sents.push(tags.map(tag => [
        tag[0],
        tag[1],
        // tag[2], 
        // tag[3]
    ]));
});

const outFile = path.join(__dirname, 'dataset/hanoi/postag-fb-01.txt');
iob.saveFile(sents, outFile).then(() => {
    console.log('DONE');
})

// console.log(ner.tag('Chưa tiết lộ lịch trình tới Hà Nội của Tổng thống Mỹ Donald Trump'))