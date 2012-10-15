// Depends on jQuery and convert_keys.js
// Keep a map of pressed keys. That way you can detect multiple key presses
// like so: if(key_pressed('shift') && key_pressed('ctrl')){...}
var keys = {};

$(document).keydown(function (e) {
    keys[e.which] = true;
});

$(document).keyup(function (e) {
    delete keys[e.which];
});

var key_pressed = function(key_name){
	return key_name.keyCode() in keys ? true : false;
};
