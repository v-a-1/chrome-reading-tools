// First determine if page has next and/or prev/previous text as a link to some page within the same domain.
// If so, bind keys such that pressing ▶ will navigate to the next page and ◀ vice versa.

var next_href = false;
var prev_href = false;

// Find next/prev hrefs (if present).
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

// Map right/left keys to prev/next (if links were found).
Keyboard.on_keys_pressed('right', function(e){
	if (next_href !== false && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA')
		window.location = next_href;
});
Keyboard.on_keys_pressed('left', function(e){
	if (prev_href !== false && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA')
		window.location = prev_href;
});
