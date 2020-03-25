const path = require('path');
const Trainer = require('../trainer');

const trainer = new Trainer({
    c1: 1.0, // coefficient for L1 penalty
    c2: 0.1, // coefficient for L2 penalty
    max_iterations: 50,
    // include transitions that are possible, but not observed
    feature_possible_transitions: 1
});

let newModelPath = path.join(__dirname, '../models/location.bin');
trainer.loadFiles(path.join(__dirname, '../dataset/hanoi/location-train.txt'));
trainer.train(newModelPath);