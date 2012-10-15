// Sometimes the text occupies the full width of the browser which is too long to read on big screens.
// So ctrl shift - will reduce the width of the text without affecting it's font size.
// ctrl shift + increases width (even beyond the bounds of the browser width).
// ctrl shift 0 resets to original size.
// This might not work correctly if any css properties have been attached to <html>
// The change is persistent. i.e. It is remembered across any domain whose html width was once modified.

// Set any pre-existing width for this domain.
// Using sync so this data is available across browsers.
chrome.storage.sync.get('html_width', function(items){
	var html_width = items.html_width !== undefined ? items.html_width : false;
    var existing_width = (html_width !== false && html_width[document.domain] !== undefined) ? html_width[document.domain] : false;
	$('html').css({'width': existing_width, 'margin': '0 auto'});
});

$(document).keydown(function (e) {
	
	if(keys_pressed('shift', 'control', '+')){
		$('html').css({'width': $('html').width() + 80, 'margin': '0 auto'});
		save_html_width($('html').width());
	}

	if(keys_pressed('shift', 'control', '-')){
		$('html').css({'width': $('html').width() - 80, 'margin': '0 auto'});
		save_html_width($('html').width());
	}

	if(keys_pressed('shift', 'control', '0')){
		$('html').css({'width': 'auto', 'margin': 'auto'});
		save_html_width($('html').width());
	}
	
});

// Save modified width to 'domain : width' pair in synced chrome storage.
var save_html_width = function(width){
	chrome.storage.sync.get('html_width', function(items){
		var html_width = items !== undefined ? items : {};
		html_width[document.domain] = width;
		chrome.storage.sync.set({'html_width': html_width});
	});
};
