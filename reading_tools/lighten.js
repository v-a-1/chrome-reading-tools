var injected = false;
var newSS;
var storage = chrome.storage.sync;

// When page loads, check from stored hash whether this domain needs to have the inverted
// style injected. If yes, then inject the style and update the injected flag.
storage.get('lightened_domains', function(items){
	if(document.domain in items.lightened_domains){
		inject_light_css();
		injected = true;
	}
});

// When user hits Ctrl i, toggle lightened colors.
Keyboard.on_keys_pressed('control', 'i', function(e){
	if(injected){
		remove_light_css();
		injected = false;
		remove_domain_from_lightened_list();
	}else{
		inject_light_css();
		injected = true;
		add_domain_to_lightened_list();
	}
});

var add_domain_to_lightened_list = function(){
	storage.get('lightened_domains', function(items){
		lightened_domains = items.lightened_domains !== undefined ? items.lightened_domains : {};
		lightened_domains[document.domain] = true;
		storage.set({'lightened_domains': lightened_domains});
	});
};

var remove_domain_from_lightened_list = function(){
	storage.get('lightened_domains', function(items){
		lightened_domains = items.lightened_domains;
		delete lightened_domains[document.domain];
		storage.set({'lightened_domains': lightened_domains});
	});
};

var inject_light_css = function(){
    var styles = '* { background: #fffbf1 !important; color: #5e4123 !important } :link, :link * { color: #2e8ccf !important } :visited, :visited * { color: #551A8B !important }';
    newSS = document.createElement('link');
    newSS.rel = 'stylesheet';
    newSS.href = 'data:text/css,' + escape(styles);
    document.getElementsByTagName("head")[0].appendChild(newSS);
};

var remove_light_css = function(){
	document.getElementsByTagName("head")[0].removeChild(newSS);
};
