/*
  Raphaël 2.1.0 - JavaScript Vector Library                         
  Copyright © 2008-2012 Dmitry Baranovskiy (http://raphaeljs.com)   
  Copyright © 2008-2012 Sencha Labs (http://sencha.com)             
  Licensed under the MIT (http://raphaeljs.com/license.html) license. 
  ***
  @title	  : Interactive Turkey Map with RaphaelJS
  Edited by Selen GORA <http://selengora.com - me@selengora.com>

  ***
   
  @title: Added modalbox
  @description: change list;
				added simple modalbox written by me
				added new variable "content_dir" for $.get requests
				added ajax req. on obj.click function
  @author: Taner DOGAN <http://tanerdogan.com - hello@tanerdogan.com>
*/

	var iscountyselected = false;
	var previouscountyselected = "blank";
	var start = true;
	var past = null;
	var content_dir = "details";
	
	$(function(){
	
	var r = Raphael('map'),
	attributes = {
            fill: '#e0e0e0',
            stroke: '#999',
            'stroke-width': 0,
            'stroke-linejoin': 'round',
        },
	arr = new Array();
	
	for (var county in paths) {
		
		var obj = r.path(paths[county].path);
		
		obj.attr(attributes);
		
		arr[obj.id] = county;
			
//		if(arr[county] == 'blank')
//			obj.attr(attributes).attr( { fill: "#000" } ); /* set blank colour */

			
							
		if(arr[obj.id] != 'blank') /* prevent change of blank colour and mouse click */
		{				
			obj.data('selected', 'notSelected');
			/* add ID to paths */
			obj.node.id = arr[obj.id];
			
			/* add title (for tooltip) to paths */
			obj.attr(attributes).attr( { title: paths[arr[obj.id]].name } );

			/* add tool tip to map 	*/ 
			$('svg a').tipsy({gravity: 'sw'});				
			/* end tool tip to map */			
			/* add crests to bottom and set county selections */
			obj.click(function(){	

			/* @author: Taner DOGAN //START */			
			$("#detail").click();
			$.get(content_dir+"/"+arr[this.id]+".html", function (html){							
				$("#detail").empty().fadeIn(700).append(html).css("display", "block");				
				$("#detail").css({
					"position": "absolute",
					"top": ((($("#detail").parent().height() +100 -  $("#detail").height()) / 2) + "px")
				});
			}).error(function() { 
				warn = "<p style='text-align:center;'>Bu bölgede kayıt bulunamadı</p><a href='#' class='close'></a>";
				$("#detail").empty().fadeIn(700).append(warn).css("display", "block");	
			});
			/* @author: Taner DOGAN //END */
			
				if(paths[arr[this.id]].value == 'notSelected')
				{
						this.animate({
						fill: '#999'
					}, 200);
			
					paths[previouscountyselected].value = "notSelected";
					paths[arr[this.id]].value = "isSelected";
					//alert(paths[arr[this.id]].value = "isSelected");
					
					//alert(arr[this.id] + previouscountyselected);
					previouscountyselected = paths[arr[this.id]].name;
						
					if (!start && past != this)
					{
						past.animate({ fill: '#e0e0e0'	}, 200);
					}
					past = this;
					start = false;					
				}
	
					
				else if(paths[arr[this.id]].value == 'isSelected')
					{
						this.animate({
							fill: '#999'
						}, 200);
						
						paths[arr[this.id]].value = "notSelected"; /* set path value */	
					}	
				
				});/* end mark selections */
		
			/* county hover bump */
			function hoverin(e){
				if(paths[arr[this.id]].value == 'notSelected')
					this.animate({
						fill: '#262e35'}, 300);						
			}
			function hoverout(e){			
				if(paths[arr[this.id]].value == 'notSelected')
					this.animate({
						fill: '#e0e0e0'}, 300);
			}
			obj.mouseout(hoverout);
				
			obj.mouseover(hoverin);
			/* end county hover bump */
			

			
			/* hide name div - !important do not delete - ajax uses contents for event search */
			$('#countyInfo').hide();
			
			$('#spinner').hide();
			/* @author: Taner DOGAN //START */	
			$(".close").live("click", function(){
				$("#detail").css("display", "none").empty();	
				past.animate({ fill: '#e0e0e0'	}, 200);
				past.animate().mouseover( function() {
					this.animate({
						fill: '#262e35'}, 300);	})
				past.animate().mouseout( function() {
					this.animate({
						fill: '#e0e0e0'}, 300);	})				
			});
			
			/* @author: Taner DOGAN //END */
			
		}/* end check on blank */
		/*Resize Map*/
		r.setViewBox(0,0,1050,620,true);
		r.setSize("100%","100%");	
	} /* end raphael loop */	

});