var OnGame = function() {
  this.total = $(".on").length;
  this.switchState(0);
  var x = this;
  $(".on").click(function() { 
    x.click_handler(this);
  });
}

OnGame.prototype.switchState = function(s) {
  if(s == 0) {
    this.state = 0;
    $("#play").show();
    $("#select, #repeat").hide();
  }
  else if(s == 1) {
    this.state = 1;
    $("#play").hide();
    $("#select, #repeat").show();
  }
}
OnGame.prototype.play_idx = function(idx) {
  var obj = $(".on").eq(idx);
  obj.find("audio").get(0).play();
  return obj;
}
OnGame.prototype.play = function() {
  if(this.state == 0) {
    var idx = Math.floor(Math.random() * this.total);
    var obj = this.play_idx(idx);
    this.last_idx = idx;
    this.last_txt = obj.find("span").text();
    this.switchState(1);
  }
}
OnGame.prototype.repeat = function() {
  if(this.state == 1) {
    this.play_idx(this.last_idx);
  }
}
OnGame.prototype.click_handler = function(on_obj) {
  on_obj = $(on_obj);

  if(this.state == 0) {
    on_obj.find("audio").get(0).play();
  }
  else if(this.state == 1) {
    let txt = on_obj.find("span").text();
    if(txt == this.last_txt) {
      alert("Correct");
    }
    else {
      alert("Wrong. The sound is " + this.last_txt);
    }
    this.switchState(0);
  }
}
