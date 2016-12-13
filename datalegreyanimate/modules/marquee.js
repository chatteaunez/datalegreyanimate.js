function marquee(dir){
  if(dir=="left"){
    this.values.push(this.values[0]);
    this.values.shift();
  }
  else if(dir=="right"){
    var last = this.values[this.values.length-1];
    this.values.splice(-1,1);
    this.values.splice(0,0,last);
  }
}
