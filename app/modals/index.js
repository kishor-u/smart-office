var mongoose = require('mongoose');
var employeeSchema=require('../schemas');
module.exports = mongoose.model('employee',employeeSchema);