# @vntk/tagger

Vietnamese Named Entity Recognition Tool

[![Join the chat at https://gitter.im/vntk/vntk-tagger](https://badges.gitter.im/vntk/vntk-tagger.svg)](https://gitter.im/vntk/vntk-tagger)

Install using npm:

> npm install -g @vntk/tagger

Two main features:

* Train a new NER from raw data, like: News, QA, Comments, or Chat logs.
* Predict new text input into entities: `PER`, `ORG`, `LOC`, `DATE`, `TIME`, ...

# Predict new text input

Simply run following command to predict new input from file:

> vntk-tagger predict [your_file_name.txt]

The output is a new file with name: `your_file_name.txt.tags`

# Train a new NER from raw data

## Step 00 - Crawl new data

Preparing your data from: News, QA, Comments, or Chat logs.

## Step 01 - Cleaning

Convert raw data to enrich data, by:

* remove junk characters
* remove comments
* delete empty line

Command: `vntk-tagger clean [your_data_file.txt]`

## Step 02 - Preprocessing

Run `node preprocess.js` to clean and convert raw data to `iob` format. Result can feed to the trainer!

* Convert xml to iob format
* Tag raw input to 

# Step 03 - Training

Run the following command to train new NER data.

> vntk-tagger train [your_training_file.txt]