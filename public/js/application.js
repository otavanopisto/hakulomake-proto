(function(){
	'use strict';
	
	$('input[name="stateInput"]').change(function(){
		var id = $('#applicationId').val();
		var newState = $(this).val();
		$('#loader-img').show();
		$.post('/update/state', {id: id, state: newState}, function(res){
			noty({
			    text: 'Hakemuksen tila päivitetty onnistuneesti.',
				type: 'success',
				timeout: 3000,
			    animation: {
			        open: 'animated fadeIn',
			        close: 'animated fadeOut',
			    }
			});
			$('#loader-img').hide();
		}).fail(function(err){
			noty({
			    text: 'Tilan päivitys epäonnistui, yritä myöhemmin uudelleen.',
				type: 'error',
			    timeout: 3000,
				animation: {
			        open: 'animated fadeIn',
			        close: 'animated fadeOut',
			    }
			});
			$('#loader-img').hide();
		});
	});
	
})();