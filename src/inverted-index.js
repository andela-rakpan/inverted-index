'use strict'
/*This is the Index Class. It has methods for creating
and searching through indexes from a JSON array object*/
class Index {
  constructor() {
    this._indexMap = {};
    this._i = 1;
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
  }

  getIndex(){
    return this._indexMap;
  }

  searchIndex(terms){
    terms = terms.toLowerCase();
    let check = this._indexMap.hasOwnProperty(terms);
    if(check){
      return this._indexMap[terms];
    }
    return false;
  }
}