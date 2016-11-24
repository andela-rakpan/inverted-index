'use strict'
let file = '../books.json';
let book = [
  {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
];

describe("Read book data", function() {
  it("should check that JSON file is not empty", function() {
    expect(checkFile(file)).not.toBeNull();
  });
});

describe("Populate Index", function() {
  it("should verify that the index is created", function() {
    var indexMap = {};
    expect(createIndex(file)).not.toBeNull();
  });

  it("should map the string keys to the correct objects in the JSON array", function() =>{
    var indexMap = {};
    expect(createIndex(book)).toContain();
  });
});

describe("Search index", function() {
  it("should return an array of the correct index of the word", function() {
    expect(checkFile(file)).not.toBeNull();
  });
});