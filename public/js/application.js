(function(){
	'use strict';
	
	var sexCode = $('#applicant-sex').text() == 'male' ? 'Mies' : 'Nainen';
	$('#applicant-sex').text(sexCode);
	
	var birthday = moment($('#applicant-birthday').text());
	$('#applicant-birthday').text(birthday.format('D.M.YYYY'));
	
	var added = moment($('#application-added').data('data-added'));
	$('#application-added').text(added.format('D.M.YYYY'));
	
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