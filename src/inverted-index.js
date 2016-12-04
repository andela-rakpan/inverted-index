/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */

/**
 * @class InvertedIndex
 */
class InvertedIndex {
  /**
   * @constructor
   */
  constructor() {
    this.indexMap = {};
  }

  /**
   * createIndex
   * Creates an index map from file contents and stores in indexMap
   * @param {Object} file - Content of file to map index
   * @return {undefined} Creates index and stores IndexMap
   */
  createIndex(file) {
    // Call readData method to validate file
    if (InvertedIndex.readData(file) === false) {
      return false;
    }

    // Call checkProperties method to check for properties text and title
    if (InvertedIndex.checkProperties(file) === false) {
      return false;
    }

    // File is valid. Create Index Map and store in object indexMap
    let index = 1;
    let map = {};
    file.forEach((content) => {
      Object.keys(content).forEach((property) => {
        const regex = /\w+/g;
        const text = content[property].toLowerCase().match(regex);
        text.forEach((word) => {
          if (!Object.prototype.hasOwnProperty.call(map, word)) {
            map[word] = [index];
          } else {
            map[word].forEach((value) => {
              if (map[word].indexOf(value) !== -1) {
                map[word].push(index);
              }
            });
          }
        });
      });
      index += 1;
    });
    const fileCount = Object.keys(this.indexMap).length + 1;
    this.indexMap[fileCount] = map;
    map = {};
  }

  /**
   * getIndex
   * Returns index map of file
   * @param {Number} [fileDocument] - specifying document to return index map
   * @param {String} [term] - specifying term in document to return index
   * @return {Object} Index map or {Array} index of term in specified document
   */
  getIndex(fileDocument, term) {
    // Return for specified document
    if (fileDocument && !term) {
      if (this.indexMap[fileDocument]) {
        return this.indexMap[fileDocument];
      }
      return undefined;
    }
    // Return entire index
    if (!fileDocument && !term) {
      return this.indexMap;
    }
    // Return for specified document and term
    if (fileDocument && this.indexMap[fileDocument][term]) {
      return this.indexMap[fileDocument][term];
    }
    return undefined;
  }

  /**
   * searchIndex
   * Returns index map of file
   * @param {number} [fileDocument] - document file to search and return index map
   * @param {string} [terms] - terms to search for in specified document
   * @return {Object} key pair value of search result of specified document
   */
  searchIndex(fileDocument, terms) {
    // Check if arguments are empty
    if (!fileDocument || !terms) {
      return [];
    }
    // Handle array
    terms = terms.toString();
    terms = terms.toLowerCase();

    // for varied terms
    const regex = /\w+/g;
    const term = terms.match(regex);

    if (term.length === 1) {
      return this.getIndex(fileDocument, terms);
    }

    const results = {};
    term.forEach((item) => {
      const value = this.getIndex(fileDocument, item);
      if (value !== undefined && value.length >= 1){
        results[item] = value;
      }
    });
    if (Object.keys(results).length >= 1) return results;
    return [];
  }

  /**
   * checkProperties
   * Ensures that each object in file has text and title properties
   * @param {object} file - document file to search and return index map
   * @return {boolen} returns false if content does not text and/or title keys
   */
  static checkProperties(file) {
    let found = true;
    file.forEach((content) => {
      const properties = Object.keys(content);
      if (properties.indexOf('title') === -1 &&
        properties.indexOf('text') === -1) {
        found = false;
      }
    });
    return found;
  }

  /**
   * readData
   * Ensures that JSON file is valid and not empty
   * @param {object} file - document file to search and return index map
   * @return {boolen} returns false if JSON file is not valid array or is empty
   */
  static readData(file) {
    // Check for valid JSON array
    if (typeof file !== 'object' || !Array.isArray(file)) {
      return false;
    }
    // Check for empty JSON array
    if (file.length <= 0) {
      return false;
    }
  }
}
