var bean= require('bean');

var Script = module.exports = function(){

  this.bind = function(){
    var that, 
        index,
        productIndex;
    this.els.tabLink.forEach(function(link){
      link
    });

    this.els.tabList[0].classList.add('active');
    bean.on(this.els.tabListContainer,'click','a', function(event) {
      
      this.els.tabList.forEach(function(tab){
        tab.classList.remove('active');
      });
      that = event.currentTarget.parentNode;
      index = this.els.tabList.indexOf(that) + 1;
      if(that.classList.contains('item')){
        event.preventDefault();
        that.classList.add('active');
        loadJSON('../locals/datas.json',
        function(data) {
          var datas = 'product'+index;
          var path = data.product.list[datas];
          this.els.cardImg.setAttribute("src",path.visual);
          this.els.cardPrice.innerHTML = path.price;
          this.els.cardDesc.innerHTML = path.desc;
        }.bind(this),
         function(xhr) { console.error(xhr); }
        );
        if(this.els.product.classList.length>1) {
          this.els.product.classList.remove(this.els.product.classList[1]);

        }

        this.els.product.classList.add('index'+index);
        


      } 
      
    }.bind(this));
  };

  this.dom = function(){
    this.els = {
      tabListContainer : document.querySelector('.list-product'),
      tabList : [].slice.call(document.getElementsByClassName('item')),
      tabLink : [].slice.call(document.querySelectorAll('.item a')),
      cardImg : document.querySelector('.product-infos>img'),
      cardPrice : document.querySelector('.price-card'),
      cardDesc : document.querySelector('.footer-card .desc'),
      product : document.querySelector('.product')

    };

  };

  this.init = function(){
    this.dom();
    this.bind();
  };

  this.init();

  return{};

};

function loadJSON(path, success, error)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
    return xhr;
}