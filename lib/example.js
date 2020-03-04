const Sentence = require('./sentence');

const REGEX_NAMED_TAG = /<([a-zA-Z0-9_]+)>(.*?)<\/\1>/g

class ExampleEntity {
    constructor(label, start, length) {
        this.label = label;
        this.start = start;
        this.length = length;
    }
}

class Example {
    constructor(example_text) {
        this._example_text = example_text;
        this._parse(example_text);
    }
    
    _parse(text) {
        let entities = this.getEntities(text);
        this.text = this.stripTags(text);
        this.sentence = new Sentence(this.text);

        this.labels = [];
        this.sentence.tokens.forEach((token) => {
            let entity = entities.find((e) => {
                return (e.start <= token.offset && token.offset <= (e.start + e.length));
            });

            let label = (entity && entity.label) || '_';
            this.labels.push(label);
        })
    }

    getEntities(text) {
        let entities = [];
        let match = false;
        let match_offset = 0;
        while(match = REGEX_NAMED_TAG.exec(text)) {
            let label = match[1];
            let name = match[2];
            let tag_size = label.length * 2 + 5;

            let start = match.index - match_offset;
            match_offset += tag_size
            entities.push(new ExampleEntity(label, start, name.length));
        }
        return entities;
    }

    stripTags(text = '') {
        return text.replace(REGEX_NAMED_TAG, '$2');
    }

}

module.exports = Example;