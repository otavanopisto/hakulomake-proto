var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  added: {type: Number, default: Date.now },
  lastName : { type: String, required: true },
  firstName : { type: String, required: true },
  birthday: { type: Date, required: true },
  ssn: {type: String, required: true},
  sex: { type: String, required: true, enum: ['male', 'female'] },
  address: { type: String, required: true },
  zipcode: { type: Number, required: true },
  city: { type: String, required: true },
  country: {type: String, required: true},
  municipality: {type: String, required: true},
  nationality: {type: String, required: true},
  language: {type: String, required: true},
  phone: { type: Number, required: true },
  email: { type: String, required: true },
  parent: {
    argumentForMinor: { type: String },
    lastName: {type: String},
    firstName: {type: String},
    address: {type: String},
    zipcode: {type: Number},
    city: {type: String},
    country: {type: String}
  },
  currentlyStudying: {type: Boolean, required: true},
  currentSchool: {type: String},
  studyGoal: {type: String, required: true},
  previousStudies: {type: String, required: true},
  previousStudiesInfo: {type: String},
  previousCollege: {
    collegeName: {type: String},
    collegeDuration: {type: String}
  },
  heardFrom : [String],
  heardFromInfo: {type: String},
  appendices: [String]
});

module.exports = mongoose.model('Application', schema);