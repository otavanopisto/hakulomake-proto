var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  // Fields for application handler
  state: { type: String, default:'waiting', enum: ['waiting', 'processing', 'reserved', 'notified', 'confirmed', 'contract', 'denied'] },
  organizationalUnit: {type: String},
  job: {type: String},
  bossTitle: {type: String},
  bossName: {type: String},
  workingHours: {type: Number},
  salary: {type: Number},
  startDate: {type: Date},
  endDate: {type: Date},
  ssn: {type: String},
  bankAccont: {type: String},
  info: {type: String},
  // Fields for applicant
  added: {type: Number, default: Date.now },
  firstName : { type: String, required: true },
  lastName : { type: String, required: true },
  address: { type: String, required: true },
  zipcode: { type: Number, required: true },
  city: { type: String, required: true },
  phone: { type: Number, required: true },
  birthday: { type: Date, required: true },
  sex: { type: String, required: true, enum: ['male', 'female'] },
  email: { type: String, required: true },
  placeOfBirth: { type: String, required: true },
  home: { type: String, required: true },
  driversLicence: {type:[String], default: []},
  driversLicenceYear: Number,
  education: { type: String, required: true },
  previousExpericence: { type: String, required: true },
  itSkills: { type: String, required: true },
  previouslyEmployed: { type: Boolean, required: true },
  whenEmployed: { type: String},
  allergies: {type: [String], default:[]},
  languages: {
	  english: { type: String, enum: ['good', 'ok', 'bad'] },
	  swedish: { type: String, enum: ['good', 'ok', 'bad'] },
	  german: { type: String, enum: ['good', 'ok', 'bad'] }
  },
  suitableWorkingPeriod: {type: [String], default: []},
  transportation: {type: [String], default:[]},
  additionalInfo: { type: String, required: true },
  primaryRequest: { type: String, required: true },
  secondaryRequest: { type: String, required: true },
  othersOk: { type: Boolean, required: true },
  basicDirectorCourses: String,
  fieldDirectorCourses: String,
  appendices: [String]
});

module.exports = mongoose.model('Application', schema);