/*
 * Copyright of Dr. Patrick Leung 2015 
 */

// ------- Get Copyright Statement ------------
var currentYear = (new Date).getFullYear();
var copyright_msg = "Copyright "+'\u00A9'+" "+currentYear+" Patrick Leung. All Rights Reserved.";
$('#copyright').text(copyright_msg);

// ------- Scroll to Section ------------
var btn_name_arr = ['cover-btn', 'about-btn', 'science-btn', 'rnd-btn', 'contact-btn'];
var section_name_arr = ['cover-section', 'about-section', 'science-section','rnd-section', 'contact-section'];
$.each(btn_name_arr, function(index,item){
	// Each item is a button name.
	$('#'+item).click( function(e){
		e.preventDefault();
		$('html, body').animate({
	         scrollTop: $('#'+section_name_arr[index]).offset().top
	    }, 500);
	});
});

// ------- Collapse Nav Bar Menu in Mobile View ------------
$('.navbar-nav').on('click', 'li a', function() {
	$('.navbar-collapse').collapse('hide');
});
$('#cover-btn').click( function(){
	$('.navbar-collapse').collapse('hide');
});

// ------- Get Science Papers ------------
var data_url = 'data/science.json';
$.ajax({
	dataType: "json",
	url: data_url,
	success: function( data ) {
		var items = [];
		var science_paper = data["science"];
		var html = '';
		$.each( science_paper, function( index ) {
			var paper_name = science_paper[index]["paperName"];
			var paper_journal = science_paper[index]["paperJournal"];
			var len = Object.keys(paper_journal).length;
			var i=0;
			html = html+'<li> '+paper_name+', (';
			$.each( paper_journal, function( key, val ){
				i++;
				var current_journal = this; 
				html = html+'<a href="'+val+'" target="_blank"><em>'+key+'</em></a>';
				if ( i != len )
				{
					html = html+", ";
				};
			});
			html = html+')</li>';
		});		
		$(html).appendTo($('#science-list'));	
	}
});

// ------- Get R&D Patents ------------
var data_url = 'data/rnd.json';
$.ajax({
	dataType: "json",
	url: data_url,
	success: function( data ) {
		var items = [];
		var rnd_patent = data["rnd"];
		var html = '';
		$.each( rnd_patent, function( index ) {
			var patent_name = rnd_patent[index]["patentName"];
			var patent = rnd_patent[index]["patent"];
			var patentLink = '';
			if (typeof rnd_patent[index]["patentLink"] == "undefined" )
			{
				html = html+'<li> '+patent_name+', (<em>'+patent+'</em>)</li>';
			}
			else
			{
				patentLink = rnd_patent[index]["patentLink"];
				html = html+'<li> '+patent_name+', ('
						+'<a href="'+patentLink+'" target="_blank"><em>'
						+patent+'</em></a>)</li>';
			}
		});	
		$(html).appendTo($('#rnd-list'));	
	}
});