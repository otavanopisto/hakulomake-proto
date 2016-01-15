(function(){
	'use strict';
	
	$('#menu-toggle').click(function(e) {
      e.preventDefault();
      $('#wrapper').toggleClass('toggled');
    });
	
	$('#applicationTable').DataTable();
	
	$('#applicationTable tr').click(function(e){
		var id = $(this).attr('data-application-id').replace(/"/g, '');
		window.location.href = '/application/'+id;
	});
	
})();