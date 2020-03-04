var vntk = require('vntk');
var ner = vntk.ner();
const path = require('path');
const fs = require('fs');
const iob = require('./lib/iob')

function readLines(path, sep = '\r\n') {
    let array = fs.readFileSync(path).toString().split(sep);
    return array;
}

const sentences = readLines(path.join(__dirname, 'dataset/hanoi/raw.txt'));

let content = '';
const sents = [];
sentences.forEach((s) => {
    console.log(s);
    const tags = ner.tag(s);
    // tags.forEach((tag) => {
    //     content += tag.join('\t') + '\n';
    // })
    sents.push(tags.map(tag => [
        tag[0], 
        tag[1], 
        // tag[2], 
        tag[3]]));
});

const outFile = path.join(__dirname, 'dataset/hanoi/pre-trained.txt');
iob.saveFile(sents, outFile).then(() => {
    console.log('DONE');
})

// console.log(ner.tag('Chưa tiết lộ lịch trình tới Hà Nội của Tổng thống Mỹ Donald Trump'))