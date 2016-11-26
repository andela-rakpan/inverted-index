'use strict'

/*This is the Index Class. It has methods for creating
and searching through indexes from a JSON array object*/
class Index {
  constructor() {
        this._indexMap = {};
        this._i = 1;
        this.result = [];
        this._fileCount = 1;
        this._map = {};
    }

  createIndex(filePath){
    filePath.forEach( content =>{
      for(let property in content){
        let regex = /\w+/g;
        let text = content[property].toLowerCase().match(regex);

        text.forEach( word =>{
          if(!this._indexMap.hasOwnProperty(word)){
            this._indexMap[word] = [this._i];
          }else{
            let check = this._indexMap[word].find(index => index===this._i);
            if(!check){
              this._indexMap[word].push(this._i);
            }
          }

        });

      }
      this._i++;
    });
    this._map[this._fileCount] = this._indexMap;
    this._fileCount++;
    this._indexMap = {};
    this._i = 1;
  }

  //Get Index Method
  getIndex(doc, term){
        if(!term){
          return this._map;
        }else{
          if(doc && this._map[doc][term]){
            return this._map[doc][term];
          }
        }
        return [];
    }

  //Search Index Method
  searchIndex(doc, terms){
    //Check if arguments are empty
    if(!doc || !terms){
      console.log('Invalid arguments');
      return [];
    }

    terms = terms.toLowerCase();

    // for varied terms
    let regex = /\w+/g;
    let term = terms.match(regex);
    if (term.length === 1) {
      return this.getIndex(doc,terms);
    } else {
      let results = {};
      term.forEach( (item) => {
        let value = this.getIndex(doc,item);
        if(value.length === 1){
            results[item] = value;
        }
      });
      if(Object.keys(results).length >= 1) return results;
    }
    return [];
  }

  sayHi() {
    alert('Hi from Index');
  }
}