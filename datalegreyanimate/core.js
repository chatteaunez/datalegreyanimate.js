var _dlya = class Datalegreyanimate {
  /* INITIALIZE FONT STYLE
   * "datalegreya" class sets the font
   */
  constructor() {
  }
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
