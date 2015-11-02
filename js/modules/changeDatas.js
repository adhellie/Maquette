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
      
      //suppression de la classe 'active' sur l'élément précédement actif
      this.els.tabList.forEach(function(tab){
        tab.classList.remove('active');
      });

      //Notre cible est le lien 'a' et nous voulons manipuler son parent 'li'. Nous le récupérons ici.
      that = event.currentTarget.parentNode;
      //Nous récupérons l'index du 'li' cible dans la liste de 'li' initiale
      index = this.els.tabList.indexOf(that) + 1;
      //Nous vérifions que l'élément contient bien la classe 'item', qu'il est bien une référence à un produit
      if(that.classList.contains('item')){
        event.preventDefault();
        //on applique la classe 'active' au 'li' parent du 'a' cliqué afin de lui appliquer un style particulier
        that.classList.add('active');
        //Nous récupérons les données des produits rangées dans un objet JSON
        loadJSON('../locals/datas.json',
        function(data) {
          var datas = 'product'+index;
          //Nous récupérons les données spécifiques au produit cliqué dans la liste
          var path = data.product.list[datas];
          //Nous remplaçons les données existantes par les données du nouveau produit cliqué dans la partie droite de la page
          this.els.cardImg.setAttribute("src",path.visual);
          this.els.cardPrice.innerHTML = path.price;
          this.els.cardDesc.innerHTML = path.desc;
        }.bind(this),
         function(xhr) { console.error(xhr); }
        );

        // Suppression de la classe index? présente pour indiquer en css le déplacement de la flèche de la fiche produit
        if(this.els.product.classList.length>1) {
          this.els.product.classList.remove(this.els.product.classList[1]);
        }
        //Réatribution d'une classe index? 
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
