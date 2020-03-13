const { FEATURES_TEMPLATE } = require('../constant');
const path = require('path');
const vntk = require('vntk');
const { Trainer, Tagger } = require('crfsuite');
const featEx = require('../lib/features');
const iob = require('../lib/iob');

const tagger = new Tagger();

let modelFileName = path.join(__dirname, '../models/location.bin');
tagger.open(modelFileName);

exports.predict = (sentence) => {
    const posTags = vntk.posTag().tag(sentence);
    const feats = posTags.map((token, i) => featEx.word2features(posTags, i, FEATURES_TEMPLATE));
    const nerTags = tagger.tag(feats);
    const zipTokens = posTags.map((tagged, i) => [tagged[0], tagged[1], nerTags[i]]);

    console.log(zipTokens);

    const tokens = zipTokens.map((tagged) => [tagged[0], tagged[2]]);
    const entities = iob.matchEntities(tokens);
    console.log(JSON.stringify(entities));

    const loc = [];

    entities.forEach((entity) => {
        loc.push([entity[3], entity[2][0]]);
    });

    return loc;
}