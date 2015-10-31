var bean= require('bean'),
    yaml = require('js-yaml'),
    fs   = require('node-fs');

var Script = module.exports = function(){

  this.bind = function(){


    // Get document, or throw exception on error
    try {
      var doc = yaml.safeLoad(fs.readFileSync('../datas.yml', 'utf8'));
      console.log(doc);
    } catch (e) {
      console.log(e);
    }
    
  };



  this.dom = function(){

  };

  this.init = function(){
    this.dom();
    this.bind();
    console.log(fs);
  };

  this.init();

  return{};

};