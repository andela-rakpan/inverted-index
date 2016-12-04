
/* Set up test requirements */
let indexMap = {};

/* Test suites */
// Read Book Data suite
describe('Read book data', () => {
  const invertedIndex = new InvertedIndex();

  it('should check that JSON file is valid JSON array', () => {
    expect(invertedIndex.createIndex('')).toBe(false);
  });

  it('should check that JSON file is not empty', () => {
    expect(invertedIndex.createIndex([])).toBe(false);
  });

  it('should ensure each object contains title and text properties', () => {
    expect(invertedIndex.createIndex(myBook)).toBe(false);
  });
});

// Populate Index suite
describe('Populate Index', () => {
  const invertedIndex = new InvertedIndex();
  invertedIndex.createIndex(book1);
  indexMap = invertedIndex.getIndex();

  it('should verify that the index is created - book1', () => {
    const expectedIndex = {
      andela: [1, 2],
      is: [1, 2],
      awesome: [1],
      this: [2]
    };

    expect(invertedIndex.getIndex('1')).toEqual(expectedIndex);
  });

  it('should ensure index is correct', () => {
    expect(invertedIndex.getIndex('1')['andela']).toEqual([1, 2]);
  });

  it('should ensure index is not overwritten by a new JSON file - book2', () => {
    const expectedIndex2 = {
      football: [1],
      is: [1, 2],
      exciting: [1],
      music: [2],
      fun: [2]
    };

    invertedIndex.createIndex(book2);
    expect(invertedIndex.getIndex('2')).toEqual(expectedIndex2);
  });
});

// Search Index Suite
describe('Search index', () => {
  const invertedIndex = new InvertedIndex();
  invertedIndex.createIndex(book1);
  const terms = 'this is awesome';
  const arrayTerms = ['this', 'is', 'awesome'];
  const result = {
    this: [2],
    is: [1, 2],
    awesome: [1]
  };

  it('should return correct index when searched', () => {
    expect(invertedIndex.searchIndex(1, 'this')).toEqual([2]);
  });

  it('should handle a varied number of search terms as arguments', () => {
    expect(invertedIndex.searchIndex(1, terms)).toEqual(result);
  });

  it('should handle an array of search terms.', () => {
    expect(invertedIndex.searchIndex(1, arrayTerms)).toEqual(result);
  });
});
