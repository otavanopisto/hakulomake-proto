var Application = require('../../model/application');
var Appendix = require('../../model/appendix');
var jade = require('jade');
var mailer = require('../../services/mailer');
var config = require('../../config');
var async = require('async');
var _ = require('underscore');
var moment = require('moment');

exports.getApplication = function(req, res){
  var id = req.params.id;
  Application.findById(id, function(err, application){
    if(err){
      res.status(404).send();
    }else{
      var appendices = [];
      async.each(application.appendices, function(appendixId, callback){
        Appendix.findById(appendixId, function(err, appendix){
          if(err){
            callback(err);
          }else{
            appendices.push(appendix);
            callback();
          }
        })
      }, function(err){
        if(err){
          res.status(500).send();
        }
        res.render('application', {application: application, appendices: appendices, positions: config.positions, root: config.server_root});
      }); 
    }
  });
};

exports.updateApplication = function(req, res){
  var id = req.body.id;
  var data = req.body.data;
  Application.findById(id, function(err, application){
    if(err){
      res.status(400).send(err);
    }else{
      application = _.extend(application, data);
      application.save(function(err, application){
        if(err){
          res.status(400).send(err);
        }else{
          res.send(application);
        }
      });  
    }
  });
};

exports.createApplication = function(req, res){
  req.checkBody('firstnameInput', 'Syötä etunimi').notEmpty();
  req.checkBody('lastnameInput', 'Syötä sukunimi').notEmpty();
  req.checkBody('birthdayInput', 'Syötä syntymäaika muodossa dd.mm.yyyy').notEmpty().isDate();
  req.checkBody('ssnInput').notEmpty();
  req.checkBody('sexInput', 'Syötä sukupuoli').notEmpty().isIn(['male', 'female']);
  req.checkBody('addressInput', 'Syötä osoite').notEmpty();
  req.checkBody('zipcodeInput', 'Syötä postinumero').notEmpty().isInt();
  req.checkBody('cityInput', 'Syötä postitoimipaikka').notEmpty();
  req.checkBody('countryInput', 'Syötä maa').notEmpty();
  req.checkBody('municipalityInput', 'Syötä asuinkunta').notEmpty();
  req.checkBody('nationalityInput', 'Syötä kansalaisuus').notEmpty();
  req.checkBody('languageInput', 'Syötä äidinkieli').notEmpty();
  req.checkBody('phoneInput', 'Syötä puhelinnumero').notEmpty();
  req.checkBody('emailInput', 'Syötä sähköpostiosoite').notEmpty().isEmail();
  
  var now = moment().valueOf();
  var birthday = moment(req.body['birthdayInput']).valueOf();
  var age = moment.duration(now - birthday).years();
  
  if(age < 18){
    req.checkBody('minorExplanationInput', 'Syötä alaikäisen hakemusperusteet').notEmpty();
    req.checkBody('parentLastnameInput', 'Syötä huoltajan sukunimi').notEmpty();
    req.checkBody('parentFirstnameInput', 'Syötä huoltajan etunimi').notEmpty();
    req.checkBody('parentAddressInput', 'Syötä huoltajan lähiosoite').notEmpty();
    req.checkBody('parentZipcodeInput', 'Syötä huoltajan postinumero').notEmpty();
    req.checkBody('parentCityInput', 'Syötä huoltajan postitoimipaikka').notEmpty();
    req.checkBody('parentCountryInput', 'Syötä huoltajan maa').notEmpty();
  }
  
  req.checkBody('currentlyStudyingInput', 'Opiskeletko parhaillaan?').notEmpty();
  req.checkBody('currentSchoolInput', 'Syötä nykyinen koulusi').notEmpty();
  req.checkBody('studyGoalInput', 'Syötä opiskelutavoitteesi').notEmpty();
  req.checkBody('currentActivityInput', 'Syötä nykyinen tilanteesi').notEmpty();
  if(req.body.currentActivityInput == '5'){
    req.checkBody('additionalActivityInput', 'Syötä tarkennus').notEmpty();
  }
  req.checkBody('previousStudiesInput', 'Syötä aikaisemmat opinnot').notEmpty();
  if(req.body.previousStudiesInput == 'Lukio (keskeytynyt)'){
    req.checkBody('previousCollegeInput', 'Syötä aikaisempi lukio').notEmpty();
    req.checkBody('previousCollegeDurationInput', 'Syötä aikaisemman lukiokoulutuksen kesto').notEmpty();
  }else if(req.body.previousStudiesInput == 'Muu'){
    req.checkBody('additionalPrevStudyInfoInput', 'Syötä tarkennus').notEmpty();
  }
  
  req.checkBody('heardFromInput', 'Mistä kuulit meistä?').notEmpty();
  
  var errors = req.validationErrors();
  if (errors) {
    console.log(errors);
    res.status(400).send(errors);
  } else {
                      
    var application = new Application({
      lastName : req.body['lastnameInput'],
      firstName : req.body['firstnameInput'],
      birthday: req.body['birthdayInput'],
      ssn: req.body['ssnInput'],
      sex: req.body['sexInput'],
      address: req.body['addressInput'],
      zipcode: req.body['zipcodeInput'],
      city: req.body['cityInput'],
      country: req.body['countryInput'],
      municipality: req.body['municipalityInput'],
      nationality: req.body['nationalityInput'],
      language: req.body['languageInput'],
      phone: req.body['phoneInput'],
      email: req.body['emailInput'],
      parent: {
        argumentForMinor: req.body['minorExplanationInput'],
        lastName: req.body['parentLastnameInput'],
        firstName: req.body['parentFirstnameInput'],
        address: req.body['parentAddressInput'],
        zipcode: req.body['parentZipcodeInput'],
        city: req.body['parentCityInput'],
        country: req.body['parentCountryInput'],
      },
      currentlyStudying: req.sanitizeBody('currentlyStudyingInput').toBoolean(),
      currentSchool: req.body['currentSchoolInput'],
      studyGoal: req.body['studyGoalInput'],
      previousStudies: req.body['previousStudiesInput'],
      previousStudiesInfo: req.body['additionalPrevStudyInfoInput'],
      previousCollege: {
        collegeName: req.body['previousCollegeInput'],
        collegeDuration: req.body['previousCollegeDurationInput']
      },
      heardFrom : req.body['heardFromInput'],
      heardFromInfo: req.body['heardFromInfoInput'],
      appendices: req.body['appendices'],
    });
    
    application.save(function(err, application){
      if(err) {
        console.log(err);
        res.status(400).send(err);
      }else{ /*
        var content = 'Kesätyöhakemuksesi on vastaanotettu onnistuneesti.'
        try {
          content = jade.renderFile(__dirname+'/../../views/mail.jade', {application: application, positions: config.positions});
        }catch(renderEx){
          console.log(renderEx)
        }      
        mailer.sendMail(application.email, 'Kesätyöhakemuksesi on vastaanotettu.', content);
        */
        res.send(application);
      }
    });
  }
};