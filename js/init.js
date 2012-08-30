$(function(){
	
	var r = Raphael('map'),
	attributes = {
            fill: '#e0e0e0',
            stroke: '#333',
            'stroke-width': 0,
            'stroke-linejoin': 'round'
        },
	arr = new Array();
	
	for (var country in paths) {
		
		var obj = r.path(paths[country].path);
		
		obj.attr(attributes);
		
		arr[obj.id] = country;
		
		obj
		.hover(function(){
			this.animate({
				fill: '#1669AD'
			}, 300);
		}, function(){
			this.animate({
				fill: attributes.fill
			}, 300);
		})	
	}
			
});