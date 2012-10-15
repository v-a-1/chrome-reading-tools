// Returns the keyCode for a given string including untypable keys.
// No better solution than a simple keyname to keycode map.
String.prototype.keyCode = function(){
	key_name = this.toLowerCase();
	// Taken from http://help.adobe.com/en_US/AS2LCR/Flash_10.0/help.html?content=00000520.html
	// and improved.
	var key_name_to_key_code_map = {
		"0": 48, "1": 49, "2": 50, "3": 51, "4": 52, "5": 53, "6": 54, "7": 55, "8": 56,
		"9": 57, "a": 65, "b": 66, "c": 67, "d": 68, "e": 69, "f": 70, "g": 71, "h": 72,
		"i": 73, "j": 74, "k": 75, "l": 76, "m": 77, "n": 78, "o": 79, "p": 80, "q": 81,
		"r": 82, "s": 83, "t": 84, "u": 85, "v": 86, "w": 87, "x": 88, "y": 89, "z": 90,
		"num0": 96, "num1": 97, "num2": 98, "num3": 99, "num4": 100, "num5": 101, "num6": 102, "num7": 103, "num8": 104,
		"num9": 105, "multiply": 106, "add": 107, "enter": 13, "subtract": 109, "decimal": 110, "divide": 111, "f1": 112, "f2": 113,
		"f3": 114, "f4": 115, "f5": 116, "f6": 117, "f7": 118, "f8": 119, "f9": 120, "f10": 121, "f11": 122,
		"f12": 123, "f13": 124, "f14": 125, "f15": 126, "backspace": 8, "tab": 9, "return": 13, "shift": 16, "control": 17,
		"ctrl": 17, "capslock": 20, "caps": 20, "esc": 27, "spacebar": 32, "space": 32, "pageup": 33, "pagedown": 34, "end": 35, "home": 36,
		"left arrow": 37, "left": 37, "up arrow": 38, "up": 38, "right arrow": 39, "right": 39, "down arrow": 40, "down": 40, "insert": 45,
		"delete": 46, "numlock": 144, "scrlk": 145, "scrolllock": 145, "scrollock": 145, "pausebreak": 19, "break": 19, "pause": 19, ";": 186,
		":": 186, "=": 187, "+": 187, "-": 189, "_": 189, "/": 191, "?": 191, "`": 192, "~": 192,
		"[": 219, "{": 219, "\\": 220, "|": 220, "]": 221, "}": 221, '"': 222, "'": 222, ",": 188,
		"<": 188, ".": 190, ">": 190
	};
	return key_name in key_name_to_key_code_map ? key_name_to_key_code_map[key_name] : undefined;
};

// Returns the keyName for a given integer.
// (Counterpart of String.prototype.KeyCode. Refer above)
Number.prototype.keyName = function(){
	key_code = this;
	var key_name_to_key_code_map = {
		"0": 48, "1": 49, "2": 50, "3": 51, "4": 52, "5": 53, "6": 54, "7": 55, "8": 56,
		"9": 57, "a": 65, "b": 66, "c": 67, "d": 68, "e": 69, "f": 70, "g": 71, "h": 72,
		"i": 73, "j": 74, "k": 75, "l": 76, "m": 77, "n": 78, "o": 79, "p": 80, "q": 81,
		"r": 82, "s": 83, "t": 84, "u": 85, "v": 86, "w": 87, "x": 88, "y": 89, "z": 90,
		"num0": 96, "num1": 97, "num2": 98, "num3": 99, "num4": 100, "num5": 101, "num6": 102, "num7": 103, "num8": 104,
		"num9": 105, "multiply": 106, "add": 107, "enter": 13, "subtract": 109, "decimal": 110, "divide": 111, "f1": 112, "f2": 113,
		"f3": 114, "f4": 115, "f5": 116, "f6": 117, "f7": 118, "f8": 119, "f9": 120, "f10": 121, "f11": 122,
		"f12": 123, "f13": 124, "f14": 125, "f15": 126, "backspace": 8, "tab": 9, "return": 13, "shift": 16, "control": 17,
		"ctrl": 17, "capslock": 20, "esc": 27, "spacebar": 32, "space": 32, "pageup": 33, "pagedown": 34, "end": 35, "home": 36,
		"left arrow": 37, "left": 37, "up arrow": 38, "up": 38, "right arrow": 39, "right": 39, "down arrow": 40, "down": 40, "insert": 45,
		"delete": 46, "numlock": 144, "scrlk": 145, "scrolllock": 145, "scrollock": 145, "pausebreak": 19, "break": 19, "pause": 19, ";": 186,
		":": 186, "=": 187, "+": 187, "-": 189, "_": 189, "/": 191, "?": 191, "`": 192, "~": 192,
		"[": 219, "{": 219, "\\": 220, "|": 220, "]": 221, "}": 221, '"': 222, "'": 222, ",": 188,
		"<": 188, ".": 190, ">": 190
	};
	return key_code in key_code_to_key_name_map ? key_code_to_key_name_map[key_code] : undefined;
};

