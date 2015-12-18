/*
	Copyright 2015 eScience-Center, University of Tübingen
	Authors: 		
		Michael Derntl <michael.derntl@uni-tuebingen.de>
		Manuel Abbt
	License: WTFPL Version 2 (http://www.wtfpl.net/txt/copying/)
*/

var escprojektpath = 'THIS IS SET THROUGH THE BODY HTML OF THE ITEM';

// Here we can add custom styles and event listeners directly upon
// insertion in the DOM tree
$(document).on('DOMNodeInserted', function(e) {
	e = $(e.target);
	if(e.is('div.content.body')) {
		e.on('DOMNodeInserted', function() {
			$(this).children('script').each(function () {
				eval(this.innerHTML)
			})
		})
	} 
	else if(e.is('#static-bubble')) {
		e.css('max-width', '800px')
	     .css('max-height', '75%')
		 .css('box-shadow', '5px 5px 5px gray');
	}
	else if(e.is('#simile')) {
		e.css('bottom', '30px')
		 .css('left', '70px')
		 .css('max-width', '800px')
		 .css('box-shadow', '5px 5px 5px gray');
	}
	else if(e.is('#simile .timeline-ether-bg')) {
		e.css('background-image', "url(\"/omeka/projekte/timebg.png\")");
	}
	else if(e.is('#waypoints.widget')) {
		e.css('max-width', '20%');
		$('#OpenLayers_Control_LayerSwitcher_56').css('right', '20%');
	}
});

function ajax_load_overviewcontent(cid){
	$.ajax({
		type: "GET",
		url: escprojektpath + "/html/" + cid + ".html",
		dataType: "html",
		success: function(htmlcontent) {
		   $.fancybox.open({
				content: htmlcontent,
				autoSize: false,
				width: '850',
				autoHeight: true,
				afterClose: function(){ recheck_esc_content(); }
		   });
		   handle_esc_content();
		}
	});
}

function esc_load_divxmlid(cid){
	$.fancybox.close();
	$("#static-bubble").children(".body").html("Loading...");
	$.ajax({
		type: "GET",
		url: escprojektpath + "/html/" + cid + ".html",
		dataType: "html",
		success: function(htmlcontent) {
			$("#static-bubble").children(".body").html(htmlcontent);
			handle_esc_content();
		}
	});
}


function recheck_esc_content(){
    $("#static-bubble").children(".body").find(".esc-background-highlight").each(function() {
        $(this).removeClass("esc-background-highlight");
    });
    $("#static-bubble").children(".body").find(".esc-text-choice-orig").each(function() {
        $(this).removeClass("esc-text-choice-hidden");
    });
    $("#static-bubble").children(".body").find(".esc-text-choice-reg").each(function() {
        $(this).addClass("esc-text-choice-hidden");
    });
    
    handle_esc_content();
}


function handle_esc_content(){
    $(".esc-textblock").each(function(){                
		if($(this).find(".esc-text-choice").length > 0) {
			$(this).mouseover(function() {
				$(this).toggleClass("esc-background-highlight").find(".esc-text-choice-orig").each(function() {
					$(this).toggleClass("esc-text-choice-hidden");
				});
				$(this).find(".esc-text-choice-reg").each(function() {
					$(this).toggleClass("esc-text-choice-hidden");
				});
			});
			$(this).mouseout(function() {
				$(this).toggleClass("esc-background-highlight").find(".esc-text-choice-orig").each(function() {
					$(this).toggleClass( "esc-text-choice-hidden" );
				});
				$(this).find(".esc-text-choice-reg").each(function(){
					$(this).toggleClass("esc-text-choice-hidden");
				});
			});
		}
	});
}