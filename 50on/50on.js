$.fn.my_play_audio = function() {
  try {
    var oo = this.find("audio").get(0);
    oo.currentTime = 0;
    oo.play();
  }
  catch(e) {}

  return this;
}
var OnGame = function() {
  this.running = false;
  this.switch_stop();
  this.switch_state(0);
  var x = this;
  $(".on").click(function() { 
    x.click_handler(this);
  });
}

OnGame.prototype.switch_state = function(s) {
  if(s == 0) {
    this.state = 0;
    $("#control > .state0").show();
    $("#control > .state1").hide();
  }
  else if(s == 1) {
    this.state = 1;
    $("#control > .state0").hide();
    $("#control > .state1").show();
  }
}
OnGame.prototype.switch_start = function() {
  this.running = true;
  $("#control > .start").hide();
  $("#control > .stop").show();
  $(".on").hide();
  $(".selected").show();
/*
  $(".on").css('visibility','hidden');
  $(".selected").css('visibility','visible');
*/
}
OnGame.prototype.switch_stop = function() {
  this.running = false;
  $("#control > .start").show();
  $("#control > .stop").hide();
  $(".on").show();
//  $(".on").css('visibility','visible');
}
OnGame.prototype.play = function() {
  var sel = $(".selected");
  var n = sel.length;
  var idx = Math.floor(Math.random() * n);
  var obj = sel.eq(idx);
  this.last_obj = obj;
  this.last_txt = obj.find("span").text();
  this.switch_state(1);
  this.repeat();
}
///
OnGame.prototype.start = function() {
  var n = $(".selected").length;
  if(n < 2) alert("Please select at least two hiragana.");
  else {
    this.switch_start();
    this.play();
  }
}
OnGame.prototype.stop = function() {
  this.switch_stop();
  this.switch_state(0);
}
OnGame.prototype.repeat = function() {
  if(this.state == 1) {
    this.last_obj.my_play_audio();
  }
}
OnGame.prototype.select_all = function() {
  if(!this.running) {
    $(".on").addClass("selected");
    $(".duplicated").removeClass("selected");
  }
}
OnGame.prototype.unselect_all = function() {
  if(!this.running) {
    $(".on").removeClass("selected");
  }
}
OnGame.prototype.click_handler = function(on_obj) {
  on_obj = $(on_obj);

  if(this.state == 0) {
    if(on_obj.hasClass("selected")) {
      on_obj.removeClass("selected");
    }
    else {
      on_obj.addClass("selected");
    }
    on_obj.my_play_audio();
  }
  else if(this.state == 1) {
    let txt = on_obj.find("span").text();
    if(txt == this.last_txt) {
      alert("Correct");
    }
    else {
      alert("Wrong. The sound is " + this.last_txt);
    }
    var x = this;
    setTimeout(function() { x.play(); },100);
  }
}
