(function(){
	'use strict';

  $('input[type="date"]').datepicker({
		language: 'fi',
		format: 'd.m.yyyy',
		weekStart: 1
	});
  
  function updateApplication(){
    var data = getValues();
		var id = $('#applicationId').val();
		$('#loader-img').show();
		$.post(SERVER_ROOT+'/update', {id: id, data: data}, function(res){
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
  }
  
  function getValues(){
    var application = {};
    application.state = $('input[name="state"]:checked').length > 0 ? $('input[name="state"]:checked').val() : '';
    return application;
  }
  
	$('input[name="state"]').change(function(){
    updateApplication();
	});
  
  $('#add-comment-btn').click(function(){
    var commentText = $('#new-comment-input').val();
    if(typeof(commentText) !== 'undefined' && commentText !== ''){
      $.post(SERVER_ROOT+'/comment',{
        text: commentText,
        application: $('#applicationId').val()
      }, function(res){
        noty({
  			  text: 'Merkintä lisätty onnistuneesti.',
  				type: 'success',
  				timeout: 3000,
  			    animation: {
  			        open: 'animated fadeIn',
  			        close: 'animated fadeOut',
  			    }
  			});
        var newComment = $('<div/>')
          .addClass('panel panel-info')
          .append($('<div/>')
            .addClass('panel-heading')
            .text(res.user+' '+res.added))
          .append($('<div/>')
            .addClass('panel-body')
            .text(res.text));
            
          $('.comment-list').prepend(newComment);
 
      }).fail(function(err){
        noty({
  			  text: 'Merkinnän lisääminen epäonnistui, yritä myöhemmin uudelleen.',
  				type: 'error',
  			    timeout: 3000,
  				animation: {
  			        open: 'animated fadeIn',
  			        close: 'animated fadeOut',
  			    }
  			});
      });
    }
  });
  
})();