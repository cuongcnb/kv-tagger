
Create postag file (IOB format) from raw file
```
node .\pretrain\sentence-to-postag.js
```

Create dataturks input file from postag file
```
node .\pretrain\postag-to-sentence.js
```

Create train file from tsv file
```
node .\pretrain\dataturks-to-iob.js
```