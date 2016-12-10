var _dlya = class Datalegreyanimate {
  static init(){
    var initStyle = document.createElement('style');
    initStyle.appendChild(document.createTextNode('@font-face {font-family: FigsFaceThin;src: url("datalegreyanimate/font-files/Datalegreya-Thin.otf") format("opentype");}'+
                                                  '@font-face {font-family: FigsFaceGradient;src: url("datalegreyanimate/font-files/Datalegreya-Gradient.otf") format("opentype");}'+
                                                  '@font-face {font-family: FigsFaceDot;src: url("datalegreyanimate/font-files/Datalegreya-Dot.otf") format("opentype");}'+
                                                  '.datalegreya{'+
                                                      'font-family:\'FigsFaceThin\';'+
                                                      '-webkit-font-feature-settings: "kern" on, "liga" on, "calt" on;'+
                                                      '-moz-font-feature-settings: "kern" on, "liga" on, "calt" on;'+
                                                      '-webkit-font-feature-settings: "kern" on, "liga" on, "calt" on;'+
                                                      '-ms-font-feature-settings: "kern" on, "liga" on, "calt" on;'+
                                                      'font-feature-settings: "kern" on, "liga" on, "calt" on;'+
                                                      'font-variant-ligatures: common-ligatures discretionary-ligatures contextual;'+
                                                  '}'+
                                                  '.datalegreya.gradient{font-family:\'FigsFaceGradient\'}'+
                                                  '.datalegreya.dot{font-family:\'FigsFaceDot\'}'
                                                 ));
    document.head.appendChild(initStyle);
  }

  static step(){
    for (var i=0;i<document.getElementsByClassName('datalegreya').length;i++) {
      var code = document.getElementsByClassName('datalegreya')[i].textContent;
      var r = '§';
      code=code.substring(1);
      var values = code.split('|');
      for (var j = 0; j < values.length; j++) {
        if (j<values.length-1)r+= values[j+1].charAt(0)+values[j].substring(1)+'|';
        else r+= values[0].charAt(0)+values[j].substring(1);
      }
      document.getElementsByClassName('datalegreya')[i].innerHTML = r;
    }
  }
}

class DAElement{
  constructor(element, string, csv) {
     this.element = element;
     this.string = string;
     this.values = interpolateArray(csv.split(',').map(Number),this.string.length);
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
}


// Utility functions
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
