// Depends on convert_keys.js
// Keep a map of pressed keys. That way you can detect multiple key presses
// like so: if(key_pressed('shift') && key_pressed('ctrl')){...}
// Which also allows nested conditionals and other logical operators like ||
// For convenience the keys_pressed function is provided.
// Which can be called like so: if(keys_pressed('shift', 'ctrl', '+', '5'){...})
// It takes a variable number of arguments and is a shortcut for writing
// if(key_pressed('shift') && key_pressed('alt') && ...)
var keys = {};

document.addEventListener('keydown', function (e) {
    keys[e.which] = true;
});

document.addEventListener('keyup', function (e) {
    delete keys[e.which];
});

var key_pressed = function(key_name){
	return key_name.keyCode() in keys ? true : false;
};

var keys_pressed = function(){
	for (var i = 0; i < arguments.length; i++) {
		if(key_pressed(arguments[i])){
			continue;
		}else{
			return false;
		}
	}
	return true;
};
