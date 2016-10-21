var employeeModel = require('../modals');
var mongoose = require('mongoose');
var md5 = require('md5');
var localStorage = require('localStorage');
var multer = require('multer');
//Multer Stoarge settings to upload file
var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './public/uploads');
  },
  filename: function(req, file, callback) {
    callback(null, localStorage.getItem('IDkey'));
  }
});
var upload = multer({
  storage: storage
}).single('userPhoto');
function getMyData(req, res) {
  return employeeModel.findOne({ _id: localStorage.getItem('IDkey')}).then(function(data) {
    return res.json({status : 200 , data : data});
    });
}
function getDeptList(req, res) {
  employeeModel.findOne({
    _id: localStorage.getItem('IDkey')
  }, 'department', function(err, data) {
    if (data === null) {
      return res.json({status : 404 , data : 'Unauthorized'});
    } else {
      employeeModel.find({
        department: data.department
      }, function(err, data) {
        if (err) {
          throw err;
        }
        return res.json({status : 200 , data : data});
      });
    }
  });
}
function updateUser(req, res) {
  return employeeModel.findById(localStorage.getItem('IDkey')).then(function(data) {
        data.name = req.body.name,
        data.username = req.body.username,
        data.password = md5(req.body.password),
        data.email = req.body.email,
        data.phone = req.body.phone,
        data.address = req.body.address,
        data.skill1 = req.body.skill1,
        data.skill2 = req.body.skill2,
        data.save().then(function(success) { return res.json({status : 200 , data : 'updated' }); });
        });
}
function uploadPhoto(req, res) {
  upload(req, res, function(err) {
    if (err) {
      return res.send('Error uploading file.');
    } else {
      res.send('File is uploaded. Press back button to return to the page');
    }
  });
}
module.exports = {
  getMyData: getMyData,
  getDeptList: getDeptList,
  updateUser: updateUser,
  uploadPhoto: uploadPhoto
};