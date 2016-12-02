[![Coverage Status](https://coveralls.io/repos/github/andela-rakpan/inverted-index/badge.svg?branch=feature%2Fsearch-index)](https://coveralls.io/github/andela-rakpan/inverted-index?branch=feature%2Fsearch-index) [![Travis Status](https://travis-ci.org/andela-rakpan/inverted-index.svg?branch=feature%2Fsearch-index)](https://travis-ci.org/andela-rakpan/inverted-index.svg?branch=feature%2Fsearch-index)

# Inverted Index

The Inverted Index Application enables you to upload your JSON array files, create an index map of words in to the corresponding JSON document in the array, and enables you to perform search on the words present.

## Using the App
When the app is installed, follow the guide below to use InvertedIndex App
* Click on 'Browse...' to select your JSON file
* Click on 'Upload File' to upload the selected file
* Upon successful upload, a 'Create Index' button is shown. Click on it to create the IndexMap
* Scroll down the page to see the created Index displayed in a tabular format
* Upload as many JSON files as you desire
* The list of uploaded files are displayed on the right hand side so you can switch between files

### Prerequisites

You should have the following technologies installed to use the app

```
node
```

### Installing

To clone the repo, run the following command

```
git clone https://github.com/andela-rakpan/inverted-index
```

Install the project dependencies

```
npm install
```

Running the App

```
node server
```

### Running the tests

To run the test, run the following command

```
npm test
```


## Author

* **Raphael I. Akpan**
