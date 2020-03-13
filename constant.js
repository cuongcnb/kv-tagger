const FEATURES_TEMPLATE = [
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

exports.FEATURES_TEMPLATE = FEATURES_TEMPLATE;