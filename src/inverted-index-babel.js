'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InvertedIndex = function () {
  /**
   * @constructor
   */
  function InvertedIndex() {
    _classCallCheck(this, InvertedIndex);

    this.map = {};
    this.i = 1;
    this.fileCount = 1;
    this.indexMap = {};
  }

  /**
   * createIndex
   * Creates an index map from file contents and stores in indexMap
   * @param {Object} file - Content of file to map index
   * @return {undefined} Creates index and stores IndexMap
   */


  _createClass(InvertedIndex, [{
    key: 'createIndex',
    value: function createIndex(file) {
      var _this = this;

      // Check for valid JSON array
      if ((typeof file === 'undefined' ? 'undefined' : _typeof(file)) !== 'object' || !Array.isArray(file)) {
        return false;
      }
      // Check for empty JSON array
      if (file.length <= 0) {
        return false;
      }
      // Check for properties text and title
      if (!this.checkProperties(file)) {
        return false;
      }

      file.forEach(function (content) {
        Object.keys(content).forEach(function (property) {
          var regex = /\w+/g;
          var text = content[property].toLowerCase().match(regex);
          text.forEach(function (word) {
            if (!Object.prototype.hasOwnProperty.call(_this.map, word)) {
              _this.map[word] = [_this.i];
            } else {
              _this.map[word].forEach(function (value) {
                if (_this.map[word].indexOf(value) !== -1) {
                  _this.map[word].push(_this.i);
                }
              });
            }
          });
        });
        _this.i += 1;
      });
      this.indexMap[this.fileCount] = this.map;
      this.fileCount += 1;
      this.map = {};
      this.i = 1;
    }

    /**
     * getIndex
     * Returns index map of file
     * @param {Number} [doc] - specifying document to return index map
     * @param {String} [term] - specifying term in document to return index
     * @return {Object} Index map or {Array} index of term in specified document
     */

  }, {
    key: 'getIndex',
    value: function getIndex(doc, term) {
      // Return for specified document
      if (doc && !term) {
        return this.indexMap[doc];
      }
      // Return entire index
      if (!doc && !term) {
        return this.indexMap;
      }
      // Return for specified document and term
      if (doc && this.indexMap[doc][term]) {
        return this.indexMap[doc][term];
      }
      return [];
    }

    /**
     * searchIndex
     * Returns index map of file
     * @param {number} [doc] - document file to search and return index map
     * @param {string} [terms] - terms to search for in specified document
     * @return {Object} key pair value of search result of specified document
     */

  }, {
    key: 'searchIndex',
    value: function searchIndex(doc, terms) {
      var _this2 = this;

      // Check if arguments are empty
      if (!doc || !terms) {
        return [];
      }
      // Handle array
      terms = terms.toString();
      terms = terms.toLowerCase();

      // for varied terms
      var regex = /\w+/g;
      var term = terms.match(regex);

      if (term.length === 1) {
        return this.getIndex(doc, terms);
      }

      var results = {};
      term.forEach(function (item) {
        var value = _this2.getIndex(doc, item);
        if (value.length >= 1) {
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

  }, {
    key: 'checkProperties',
    value: function checkProperties(file) {
      var found = true;
      file.forEach(function (content) {
        var properties = Object.keys(content);
        if (properties.indexOf('title') === -1 && properties.indexOf('text') === -1) {
          found = false;
        }
      });
      return found;
    }
  }]);

  return InvertedIndex;
}();