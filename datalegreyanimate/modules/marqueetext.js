function marqueetext(dir){
  if(dir=="left"){
    var str = this.text.slice(1)+this.text.slice(0,1);
    this.text = str;
  }
  else if (dir=="right") {
    var str = this.text.slice(-1)+this.text.slice(0,-1);
    this.text = str;
  }
}
