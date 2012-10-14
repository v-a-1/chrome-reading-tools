// First determine if page has next and/or prev/previous text as a link to some page within the same domain.
// If so, bind keys such that pressing ▶ will navigate to the next page and ◀ vice versa.

var next_href = false;
var prev_href = false;

$('a').each(function(){

	var link_text = $.trim($(this).text());

	var next = link_text.match(/^(next)$/i);
	if(next !== null){
		next_href = $(this).attr("href");
	}

	var prev = link_text.match(/^(prev|previous)$/i);
	if(prev !== null){
		prev_href = $(this).attr("href");
	}
	
});

$(document).live('keydown', function (e) {
	if ( e.keyCode == 39 && next_href !== false){
		window.location = next_href;
	}
	if ( e.keyCode == 37 && prev_href !== false){
		window.location = prev_href;
	}
});

// Sometimes the text occupies the full width of the browser which is too long to read on big screens.
// So ctrl + shift + - will reduce the width of the text without affecting it's font size.
// ctrl + shift + + increases width (even beyond the bounds of the browser width).
// ctrl + shift + 0 resets to original size.
// This might not work correctly if any css properties have been attached to <html>

// Before anything else, check if this domain had its width previously
// modified. If so, set that as the width;



var keys = {};

$(document).keydown(function (e) {
    keys[e.which] = true;
});

$(document).keyup(function (e) {
    delete keys[e.which];
});
var existing_width = $('html').width();
// Set any pre-existing width.
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


function save_html_width(width){
	var html_width = {};
	chrome.storage.sync.get('html_width', function(items){
		html_width = items !== undefined ? items : {};
	});
	html_width[document.domain] = width;
	chrome.storage.sync.set({'html_width': html_width});
}
