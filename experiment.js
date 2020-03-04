'use strict';
const Trainer = require('./trainer');

const trainer = new Trainer({
    c1: 1.0, // coefficient for L1 penalty
    c2: 0.1, // coefficient for L2 penalty
    max_iterations: 300,
    // include transitions that are possible, but not observed
    feature_possible_transitions: 1
});

trainer.loadFiles('./dataset/vlsp2016/train.txt');
trainer.train();