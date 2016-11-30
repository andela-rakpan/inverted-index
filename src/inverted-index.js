/* eslint-disable no-unused-vars */
/** This is the Index Class. It has methods for creating
and searching through indexes from a JSON array object*/
class Index {
  constructor() {
    this.map = {};
    this.i = 1;
    this.result = [];
    this.fileCount = 1;
    this.indexMap = {};
  }

  createIndex(filePath) {
    filePath.forEach((content) => {
      Object.keys(content).forEach((property) => {
        const regex = /\w+/g;
        const text = content[property].toLowerCase().match(regex);
        text.forEach((word) => {
          if (!Object.prototype.hasOwnProperty.call(this.map, word)) {
            this.map[word] = [this.i];
          } else {
            this.map[word].forEach((value) => {
              if (this.map[word].indexOf(value) !== -1) {
                this.map[word].push(this.i);
              }
            });
          }
        });
      });
      this.i += 1;
    });
    this.indexMap[this.fileCount] = this.map;
    this.fileCount += 1;
    this.map = {};
    this.i = 1;
  }

  // Get Index Method
  getIndex(doc, term) {
    if (!term) {
      return this.indexMap;
    }

    if (doc && this.indexMap[doc][term]) {
      return this.indexMap[doc][term];
    }
    return [];
  }

  // Search Index Method
  searchIndex(doc, terms) {
    // Check if arguments are emapty
    if (!doc || !terms) {
      return [];
    }
    // Handle array
    terms = terms.toString();

    terms = terms.toLowerCase();

    // for varied terms
    const regex = /\w+/g;
    const term = terms.match(regex);

    if (term.length === 1) {
      return this.getIndex(doc, terms);
    }

    const results = {};
    term.forEach((item) => {
      const value = this.getIndex(doc, item);
      if (value.length >= 1) {
        results[item] = value;
      }
    });
    if (Object.keys(results).length >= 1) return results;
    return [];
  }
}
