(function(){
	'use strict';
	
	$('input[data-type="date"]').datepicker({
		language: 'fi',
		format: 'd.m.yyyy',
		weekStart: 1
	});
	
  $(document).on('click', '.delete-appendix', function(){
    var id = $(this).attr('data-id');
    var _this = this;
    $.ajax({
      url: SERVER_ROOT+'/upload/'+id,
      method: 'DELETE',
      success: function(res){
        $(_this).parents('p').remove();
      }
    })
  });
  
  $('#birthdayInput').change(function(){
    var now = moment().valueOf();
    var birthday = moment($(this).val(), 'D.M.YYYY').valueOf();
    var age = moment.duration(now - birthday).years();
    if(age < 18){
      $('.parentInfo').show(); 
    }else{
      $('.parentInfo').hide();
    }
  });
  
  $('#currentlyStudyingInput').change(function(){
    if($(this).val() == '1'){
      $('.currentSchoolContainer').show();
    }else{
      $('.currentSchoolContainer').hide();
    }
  });
  
  $('#currentActivityInput').change(function(){
    if($(this).val() == '5'){
      $('.additionalActivityInputContainer').show();
    }else{
      $('.additionalActivityInputContainer').hide();
    }
  });
  
  $('#previousStudiesInput').change(function(){
    if($(this).val() == 'Lukio (keskeytynyt)'){
      $('.prevCollegeInfoContainer').show();
      $('.additionalPrevStudyContainer').hide();
    }else if($(this).val() == 'Muu'){
      $('.prevCollegeInfoContainer').hide();
      $('.additionalPrevStudyContainer').show();
    }else{
      $('.prevCollegeInfoContainer').hide();
      $('.additionalPrevStudyContainer').hide();
    }
  });
  
  $('#appendixInput').fileupload({
      dataType: 'json',
      done: function (e, data) {
          $.each(data.result, function (index, file) {
              $('<p/>')
                .append('<input type="hidden" value="'+file._id+'" name="appendices" />')
                .append('<a href="'+SERVER_ROOT+'/upload/'+file._id+'" target="blank">'+file.originalname+'</a>')
                .append('<span data-id="'+file._id+'" class="glyphicon glyphicon-trash pull-right delete-appendix"></span>')
                .appendTo('#files');
          });
      },
      progressall: function (e, data) {
          var progress = parseInt(data.loaded / data.total * 100, 10);
          $('#progress .progress-bar').css(
              'width',
              progress + '%'
          );
      }
  }).prop('disabled', !$.support.fileInput)
      .parent().addClass($.support.fileInput ? undefined : 'disabled');
  
	$('#main-form').submit(function(e){
		var values = {};
		e.preventDefault();
		for(var i = 0; i < e.target.length; i++){
			var element = $(e.target[i]);
			if(element.is('input') || element.is('textarea') || element.is('select')){
				if(element.attr('type') == 'checkbox'){
					if(element.prop('checked')){
						if(values.hasOwnProperty(element.attr('name'))){
							values[element.attr('name')].push(element.val());
						}else{
							values[element.attr('name')] = [element.val()];
						}
					}
				}else if(element.attr('type') == 'radio'){
					if(element.prop('checked')){
						values[element.attr('name')] = element.val();
					}
				}else if(element.attr('data-type') == 'date'){
					if(typeof(element.val()) !== 'undefined' && element.val() !== ''){
						values[element.attr('name')] = moment(element.val(), 'D.M.YYYY').toDate();
					}	
				} else if(element.attr('type') == 'hidden'){
					if(values.hasOwnProperty(element.attr('name'))){
						values[element.attr('name')].push(element.val());
					}else{
						values[element.attr('name')] = [element.val()];
					}
				}else if(element.attr('type') != 'file'){
					values[element.attr('name')] = element.val();
				}
			}
		}
		$('#loader-img').show();
		$('.error-container').remove();
		$.post(SERVER_ROOT+'/application', values, function(res){
			noty({
			    text: 'Kesätyöhakemus lähetetty onnistuneesti.',
				type: 'success',
				timeout: 3000,
			    animation: {
			        open: 'animated fadeIn',
			        close: 'animated fadeOut',
			    }
			});
			$('input,textarea').val('');
			$('#loader-img').hide();
		}).fail(function(err){
			noty({
			    text: 'Hakemuksen lähetys epäonnistui, tarkista kentät ja yritä uudelleen.',
				type: 'error',
				timeout: 3000,
			    animation: {
			        open: 'animated fadeIn',
			        close: 'animated fadeOut',
			    }
			});
			var errors = err.responseJSON;
			for(var i = 0; i < errors.length;i++){
				var error = errors[i];
				if(typeof(error.param) !== 'undefined'){
			    $('*[name="'+error.param+'"]').after('<span class="error-container">'+error.msg+'</span>');
				}
			}
      $('.error-container').first().prev()[0].scrollIntoView({
          behavior: 'smooth',
          block: 'start'
      });
			$('#loader-img').hide();
		});
	});
	
})();