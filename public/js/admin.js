(function(){
	'use strict';
	
  $('.filter').change(function(){
    var queryString = '';
    $('.filter').each(function(){
      queryString += '?'+$(this).attr('name')+'='+$(this).val();
    });
    window.location.href = '/admin'+queryString;
  });
  
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