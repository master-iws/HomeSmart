app.value('shouldSwipe', function(element){
	var update = true;

	// strange enough $event.fromElement is always null
	var current = element;
	while(current && current != document.body){
		if(current.getAttribute('swipe')=='false'){
			update = false;
			break;
		}
		current = current.parentElement;
	}

	return update;
});