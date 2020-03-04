'use strict';
const path = require('path');
const vntk = require('vntk');
const test = require('tape');
const Trainer = require('../../trainer');

const trainer = new Trainer({
    c1: 1.0, // coefficient for L1 penalty
    c2: 0.1, // coefficient for L2 penalty
    max_iterations: 50,
    // include transitions that are possible, but not observed
    feature_possible_transitions: 1
});

let newModelPath = path.resolve('../models/model.bin');
trainer.loadFiles('./dataset/hanoi/dev.txt');
trainer.train(newModelPath);

test('new trained model', function (t) {
    t.plan(3);

    let newNER = vntk.ner(newModelPath);
    let text = 'Nhật ký SEA Games ngày 21/8: Ánh Viên thắng giòn giã ở vòng loại.';
    let tags = newNER.tag(text);

    console.log('New model:', tags);

    t.deepEqual(newNER.tag(''), [], 'empty string');
    t.deepEqual(tags[6][3], 'B-PER', 'B-PER from new model');
    t.deepEqual(tags[7][3], 'I-PER', 'I-PER from new model');
});