const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const async = require('async');
const crfsuite = require('crfsuite');
const conlleval = require('@vntk/conlleval');
const iobParser = require('./lib/iob');
const featEx = require('./lib/features');


let template =  [
    'T[-2].lower', 'T[-1].lower', 'T[0].lower', 'T[1].lower', 'T[2].lower',
    'T[0].istitle', 'T[-1].istitle', 'T[1].istitle', 'T[-2].istitle', 'T[2].istitle',
    //# word unigram and bigram
    'T[-2]', 'T[-1]', 'T[0]', 'T[1]', 'T[2]',
    'T[-2,-1]', 'T[-1,0]', 'T[0,1]', 'T[1,2]',
    //# pos unigram and bigram
    'T[-2][1]', 'T[-1][1]', 'T[0][1]', 'T[1][1]', 'T[2][1]',
    'T[-2,-1][1]', 'T[-1,0][1]', 'T[0,1][1]', 'T[1,2][1]',
    //# ner
    'T[-3][3]', 'T[-2][3]', 'T[-1][3]',
];

const tagger = new crfsuite.Tagger();

let test_sents = iobParser.fromFile('./dataset/vlsp2016.100/test.txt');
let model_filename = path.resolve('./models/model.bin');

if (!fs.existsSync(model_filename)) {
    console.error('Firstly please run: npm run train');
    return process.exit(1);
}

if (tagger.open(model_filename)) {
    console.log('open file model ok!', model_filename);
}

function transform(tokens) {
    return tokens.map((token, i) => featEx.word2features(tokens, i, template));
}

const diff = [];

test_sents.forEach((sent, index) => {
    console.log('Predict, sent at: ', index);
    let X_test = transform(sent);
    let output = tagger.tag(X_test);

    let tokens = sent.map((token, i) => {
        return [
            token[0],   // term
            token[3],   // y_correct
            output[i]   // y_guessed
        ]
    });

    diff.push(tokens);
});

// run conlleval

// let tokens = _.flatten(diff);

let fn = './models/diff.txt';

let writeFile = new Promise((resolve, reject) => {
    let stream = fs.createWriteStream(fn);
    console.log('Write different.txt');

    async.each(diff, (sent, cb1) => {
        async.each(sent, (token, cb2) => {
            let data = `${token.join('\t')}\n`;
            stream.write(data, 'utf8', cb2);
        }, cb1);
    }, (err) => {
        stream.end();
    });

    stream.on('finish', resolve);
    stream.on('error', reject);
});

writeFile.then(() => {
    let metrics = conlleval.measure_performance(fn, '\t');

    fs.writeFileSync('./models/metrics.json', JSON.stringify(metrics, null, 2));
    
    console.log('Evaluation done!');
});