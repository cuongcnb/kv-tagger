const path = require('path');
const vntk = require('vntk');
const { Trainer, Tagger } = require('crfsuite');
const featEx = require('../lib/features');
const iob = require('../lib/iob');

const template = [
    'T[-2].lower', 'T[-1].lower', 'T[0].lower', 'T[1].lower', 'T[2].lower',
    'T[0].istitle', 'T[-1].istitle', 'T[1].istitle', 'T[-2].istitle', 'T[2].istitle',
    // # word unigram and bigram
    'T[-2]', 'T[-1]', 'T[0]', 'T[1]', 'T[2]',
    'T[-2,-1]', 'T[-1,0]', 'T[0,1]', 'T[1,2]',
    // # pos unigram and bigram
    'T[-2][1]', 'T[-1][1]', 'T[0][1]', 'T[1][1]', 'T[2][1]',
    'T[-2,-1][1]', 'T[-1,0][1]', 'T[0,1][1]', 'T[1,2][1]',
    // # ner
    // 'T[-3][3]', 'T[-2][3]', 'T[-1][3]',
];

const tagger = new Tagger();

let modelFileName = path.join(__dirname, '../models/location.bin');
let sentence = 'Em chào chị Nguyen Thuy Dung ạ.\nHiện tại KiotViet đã có chi nhánh ở Thành phố Vinh. Không biết chị đang cần hỗ trợ vấn đề gì để em báo chuyên viên hỗ trợ cho chị luôn ạ.';
const posTags = vntk.posTag().tag(sentence);
const feats = posTags.map((token, i) => featEx.word2features(posTags, i, template));
tagger.open(modelFileName);
const nerTags = tagger.tag(feats);
const zipTokens = posTags.map((tagged, i) => [tagged[0], tagged[1], nerTags[i]]);

console.log(zipTokens);

const tokens = zipTokens.map((tagged) => [tagged[0], tagged[2]]);
const entities = iob.matchEntities(tokens);
const r = entities.reduce((res, entity) => {
    res[`${entity[1]}`] = entity[3];
    return res;
}, {});
console.log(r);