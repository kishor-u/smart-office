var mongoose = require('mongoose');
var employeeSchema = new mongoose.Schema({
  name : 
  { 
    type: String, 
    Default: null, 
    required: false 
  },
  username : 
  { 
    type: String, 
    Default : null, 
    required: false 
  },
  password : 
  { 
    type: String, 
    Default: null, 
    required: false
  },
  phone : 
  { 
    type: Number, 
    Default: null, 
    required: false 
  },
  email : 
  { 
    type: String, 
    Default: null, 
    required: false 
  },

  department : 
  { 
    type: String, 
    Default: null, 
    required: false 
  },
  address :
  {
    type: String,
    Default: null,
    required: false
  },
  message :
  {
    type: String,
    Default: null,
    required: false
  },
  skill1 :
  {
    type: String,
    Default: null,
    required: false
  },
  skill2 :
  {
    type: String,
    Default: null,
    required: false
  },
  status :
  {
    type: String,
    Default: 'user',
    enum: ['user','admin'],
    required: false
  }
});

module.exports = employeeSchema;