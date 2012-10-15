// Sometimes the text occupies the full width of the browser which is too long to read on big screens.
// So ctrl shift - will reduce the width of the text without affecting it's font size.
// ctrl shift + increases width (even beyond the bounds of the browser width).
// ctrl shift 0 resets to original size.
// This might not work correctly if any css properties have been attached to <html>
// The change is persistent. i.e. It is remembered across any domain whose html width was once modified.

// -- Keep track of which keys have been pressed.
// Thus enabling detection of multiple key presses.
var keys = {};

$(document).keydown(function (e) {
    keys[e.which] = true;
});

$(document).keyup(function (e) {
    delete keys[e.which];
});
// -- Keys tracking end

var existing_width = $('html').width();
// Set any pre-existing width for this domain.
// Using sync so this data is available across browsers.
chrome.storage.sync.get('html_width', function(items){
	var html_width = items.html_width !== undefined ? items.html_width : false;
    existing_width = (html_width !== false && html_width[document.domain] !== undefined) ? html_width[document.domain] : false;
	$('html').css({'width': existing_width, 'margin': '0 auto'});
});

var html_width = existing_width;
// shift: 16, control: 17, +: 187, -:189, 0:48
$(document).keydown(function (e) {
	if(16 in keys && 17 in keys){ // Shift Control
		if(187 in keys){ // Increase html width '+'
			$('html').css({'width': html_width + 80, 'margin': '0 auto'});
			html_width = $('html').width();
			save_html_width(html_width);
		}else if(189 in keys){ // Decrease html width '-'
			$('html').css({'width': html_width - 80, 'margin': '0 auto'});
			html_width = $('html').width();
			save_html_width(html_width);
		}else if(48 in keys){ // Reset html width '0'
			$('html').css({'width': 'auto', 'margin': 'auto'});
			html_width = $('html').width();
			save_html_width(html_width);
		}
	}
});

// Save modified width to 'domain : width' pair in synced chrome storage.
function save_html_width(width){
	var html_width = {};
	chrome.storage.sync.get('html_width', function(items){
		html_width = items !== undefined ? items : {};
	});
	html_width[document.domain] = width;
	chrome.storage.sync.set({'html_width': html_width});
}
