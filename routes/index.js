var Application = require('../model/application');
var _ = require('underscore');

module.exports = function(app, root){
  
  app.get(root, function(req, res){
    res.render('form');
  });
  
  app.post('/update', function(req, res){
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
  });
  
  app.get('/application/:id', function(req, res){
    var id = req.params.id;
    Application.findById(id, function(err, application){
      if(err){
        res.status(404).send();
      }else{
        res.render('application', {application: application});
      }
    });
  });
  
  app.get('/admin/:state*?', function(req, res){
    var state = req.params.state;
    if(typeof(state) == 'undefined' || state == ''){
      state = 'waiting';
    }
    Application.find({state: state})
      .sort({ added: 1 })
      .exec(function(err, applications){
        if(err){
          res.status(404).send();
        }else{
          res.render('admin', {applications: applications, state: state});
        }
      });
  });
  
  app.post('/application', function(req, res){

    req.checkBody('firstnameInput', 'Syötä etunimi').notEmpty();
    req.checkBody('lastnameInput', 'Syötä sukunimi').notEmpty();
    req.checkBody('addressInput', 'Syötä osoite').notEmpty();
    req.checkBody('zipcodeInput', 'Syötä postinumero').notEmpty().isInt();
    req.checkBody('cityInput', 'Syötä postitoimipaikka').notEmpty();
    req.checkBody('phoneInput', 'Syötä puhelinnumero').notEmpty();
    req.checkBody('birthdayInput', 'Syötä syntymäaika muodossa dd.mm.yyyy').notEmpty().isDate();
    req.checkBody('sexInput', 'Syötä sukupuoli').notEmpty().isIn(['male', 'female']);
    req.checkBody('emailInput', 'Syötä sähköpostiosoite').notEmpty().isEmail();
    req.checkBody('placeofbirthInput', 'Syötä syntymäpaikka').notEmpty();
    req.checkBody('homeInput', 'Syötä kotipaikka').notEmpty();
    req.checkBody('educationInpuit', 'Syötä koulutustiedot').notEmpty();
    req.checkBody('experienceInput', 'Syötä kokemustiedot').notEmpty();
    req.checkBody('itskillsInput', 'Syötä ATK-taidot').notEmpty();
    req.checkBody('previouslyEmployedInput', 'Oletko aiemmin työskennellyt kaupungille?').notEmpty().isBoolean();
    req.checkBody('englishInput', 'Syötä kielitaito').isIn(['good', 'ok', 'bad', '']);
    req.checkBody('swedishInput', 'Syötä kielitaito').isIn(['good', 'ok', 'bad', '']);
    req.checkBody('germanInput', 'Syötä kielitaito').isIn(['good', 'ok', 'bad', '']);
    req.checkBody('suitableWorkingPeriodInput', 'Syötä sopiva työskentely kausi').notEmpty();
    req.checkBody('additionalInfoInput', 'Syötä lisätiedot').notEmpty();
    req.checkBody('primaryRequestInput', 'Syötä ensisijainen paikkatoive').notEmpty();
    req.checkBody('secondaryRequestInput', 'Syötä toissijainen paikkatoive').notEmpty();
    req.checkBody('othersOk', 'Haluatko työskennellä muissa tehtävissä?').notEmpty().isBoolean();

    var errors = req.validationErrors();
    if (errors) {
      res.status(400).send(errors);
    } else {
                        
      var application = new Application({ 
        firstName : req.body['firstnameInput'],
        lastName : req.body['lastnameInput'],
        address: req.body['addressInput'],
        zipcode: req.sanitizeBody('zipcodeInput').toInt(),
        city: req.body['cityInput'],
        phone: req.body['phoneInput'],
        birthday: req.body['birthdayInput'],
        sex: req.body['sexInput'],
        email: req.body['emailInput'],
        placeOfBirth: req.body['placeofbirthInput'],
        home: req.body['homeInput'],
        driversLicence: req.body['driversLicenceInput'],
        driversLicenceYear: req.sanitizeBody('driverslicenceyearInput'),
        education: req.body['educationInpuit'],
        previousExpericence: req.body['experienceInput'],
        itSkills: req.body['itskillsInput'],
        previouslyEmployed: req.sanitizeBody('previouslyEmployedInput').toBoolean(),
        whenEmployed: req.body['whenEmployedInput'],
        allergies: req.body['allergiesInput'],
        suitableWorkingPeriod: req.body['suitableWorkingPeriodInput'],
        transportation: req.body['transportationInput'],
        additionalInfo: req.body['additionalInfoInput'],
        primaryRequest: req.body['primaryRequestInput'],
        secondaryRequest: req.body['secondaryRequestInput'],
        othersOk: req.body['othersOk'],
        basicDirectorCourses: req.body['basicDirectorCoursesInput'],
        fieldDirectorCourses: req.body['fieldDirectorCoursesInput']
      });
      
      if(req.body['englishInput'] !== '') 
        application.languages.english = req.body['englishInput'];
      
      if(req.body['swedishInput'] !== '') 
        application.languages.swedish = req.body['swedishInput'];
        
      if(req.body['germanInput'] !== '') 
        application.languages.german = req.body['germanInput'];
      
      if(typeof(req.body['otherAllergies']) !== 'undefined' && req.body['otherAllergies'] !== ''){
        if(typeof(application.allergies) !== 'undefined' && application.allergies.length > 0){
          application.allergies.push(req.body['otherAllergies']);
        }else{
          application.allergies = [req.body['otherAllergies']];
        }
      }
      
      application.save(function(err, application){
        if(err) {
          res.status(400).send(err);
        }else{
          res.send(application);
        }
      });
		}

  });
};