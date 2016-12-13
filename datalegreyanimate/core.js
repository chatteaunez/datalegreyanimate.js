var _dlya = class Datalegreyanimate {
  // la methode init() charge le css nécessaire à l'affichage,
  // crée dynamiquement les éléments "DAElement" à partir du DOM
  // (tout element avec la classe "dyla" appendra un DAElement
  // dans l'array "_dlya.instances")

  // NEXT STEP : Chargement dynamique des fichier de modules
  static init(){
    var initStyle = document.createElement('style');
    initStyle.appendChild(document.createTextNode('@font-face {font-family: FigsFaceThin;src: url("datalegreyanimate/font-files/Datalegreya-Thin.otf") format("opentype");}'+
                                                  '@font-face {font-family: FigsFaceGradient;src: url("datalegreyanimate/font-files/Datalegreya-Gradient.otf") format("opentype");}'+
                                                  '@font-face {font-family: FigsFaceDot;src: url("datalegreyanimate/font-files/Datalegreya-Dot.otf") format("opentype");}'+
                                                  '.dlya{'+
                                                      'font-family:\'FigsFaceThin\';'+
                                                      '-webkit-font-feature-settings: "kern" on, "liga" on, "calt" on;'+
                                                      '-moz-font-feature-settings: "kern" on, "liga" on, "calt" on;'+
                                                      '-webkit-font-feature-settings: "kern" on, "liga" on, "calt" on;'+
                                                      '-ms-font-feature-settings: "kern" on, "liga" on, "calt" on;'+
                                                      'font-feature-settings: "kern" on, "liga" on, "calt" on;'+
                                                      'font-variant-ligatures: common-ligatures discretionary-ligatures contextual;'+
                                                  '}'+
                                                  '.dlya.gradient{font-family:\'FigsFaceGradient\'}'+
                                                  '.dlya.dot{font-family:\'FigsFaceDot\'}'
                                                 ));
    document.head.appendChild(initStyle);

    var elements = document.getElementsByClassName('dlya');
    for (var i=0;i<elements.length;i++){

      this.create(elements[i]);
    }
  }

  // PROVISOIRE : la methode step() call les methodes step() et render()
  // de toutes les instances
  static step(){
    for (var i = 0; i < this.instances.length; i++) {
      this.instances[i].step();
      this.instances[i].render();
    }
  }


  ////// CREATE //////
  // cette methode genère un DAElement dans l'array instances[]
  // à partir d'un élément du DOM
  // NEXT STEP : gérer les absent d'attribut sur l'élément passé
  static create(e){
    if(this.instances==null)this.instances=[];
    this.instances[this.instances.length]= new DAElement(e,e.textContent,e.dataset.values);
  }
}

// cette classe sert a stocker les donnée relative aux elements
// element = l'element du DOM correspondant
// animation = le type d'animation appliqué a l'élément
// string = ce qui est écrit
// values = un array d'entiers pour dessiner la courbe
class DAElement{
  constructor(element, string, csv) {
     this.element = element;
     this.animation = element.dataset.animation;
     this.text = string;
     this.originalValues = csv.split(',');
     this.values = interpolateArray(csv.split(',').map(Number),this.text.length+1);
     for(var i=0;i<this.values.length;i++){
       this.values[i]=Math.round(mapRange(
                                          this.values[i],
                                          Math.min(...this.values),
                                          Math.max(...this.values),
                                          0,
                                          3
                                        ));
     }
   }

   // cette methode appelle la fonction d'animation spécifiée
   step() {
    var args = this.animation.split(",");
    var namespaces = args.splice(0,1)[0].split(".");
    var func = namespaces.pop();
    for(var i = 0; i < namespaces.length; i++) {
      window = window[namespaces[i]];
    }
    return window[func].apply(this, args);
  }


  // cette methode traduit les données de l'objet en une chaine de caractère
  // lisible par la font datalegreya, et l'injecte dans l'élément du DOM.
  // elle update également les attributs de l'élément
  render(){
     var code='§'+this.values[0];
     for (var i = 0; i < this.text.length; i++) {
       code+=this.text[i];
       if(i!=this.text.length)code+='|';
       code+=this.values[i+1];
     }
     this.element.innerHTML=code;
     this.element.dataset.values=this.values.toString();
     this.element.dataset.animation=this.animation;
  }
}


// UTILITIES

// interpoler l'array de valeur
function interpolateArray(data,tLen) {
    var linearInterpolate = function(b,a,p){
      return b+(a-b)*p;
    };
    var r=new Array();
    var f=new Number((data.length-1)/(tLen-1));
    r[0]=data[0];
    for(var i=1;i<tLen-1;i++) {
        var tmp=i*f;
        var b=new Number(Math.floor(tmp)).toFixed();
        var a=new Number(Math.ceil(tmp)).toFixed();
        var p=tmp-b;
        r[i]=linearInterpolate(data[b],data[a],p);
    }
    r[tLen-1]=data[data.length-1];
    return r;
}
function mapRange(v,iL,iH,tL,tH) {
    return tL+(tH-tL)*(v-iL)/(iH-iL);
}
