(function(){
	'use strict';
	
	$('#menu-toggle').click(function(e) {
      e.preventDefault();
      $('#wrapper').toggleClass('toggled');
    });
	
	$('#applicationTable').DataTable();
	
	$('#applicationTable tr').click(function(e){
		window.location.href = '/application/'+$(this).attr('data-application-id');
	});
	
})();