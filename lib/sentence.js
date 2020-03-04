const pos = require('vntk').posTag();
const SPACE = 1;

class WordToken {
    constructor(text, pos, offset, length) {
        this.text = text;
        this.pos = pos;
        this.offset = offset;
        this.length = length;
    }
}

class Sentence {

    constructor(text) {
        this.tags = pos.tag(text);
        this.words = [];
        this.postags = [];
        this.tokens = [];

        // split tokens
        let currentOffset = 0;
        this.tags.forEach((tag) => {
            let word = tag[0];
            let token = tag[1];
            this.words.push(word);
            this.postags.push(token);
            this.tokens.push(new WordToken(word, token, currentOffset, word.length));

            currentOffset += word.length + SPACE;
        })
    }

}

console.log(new Sentence('Tôi đến từ Hà Nội'))

module.exports = Sentence;