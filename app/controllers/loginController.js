var employeeModel = require('../modals');
var mongoose = require('mongoose');
var md5 = require('md5');
var localStorage = require('localStorage');

function getToken(req, res, next) {
  return res.send(JSON.stringify(localStorage.getItem('IDkey')));
}
function signUp(req, res) {
  return employeeModel.findOne({ username: req.body.username, password: md5(req.body.password) }).then(function(data) {
    if (data == null) {
      return res.json({ status: 401, data: 'Unauthorized' });
    } else {
      localStorage.setItem('IDkey', data._id);
      return res.json({ status: 200, data: data.status });
    }
  }, function(err) {
    res.send(err);
  });
}

function logout(req, res, next) {
  localStorage.removeItem('IDkey');
  localStorage.clear();
  return res.json({ status: 200, data: 'logout' });
}
function others(req, res) {
  return res.sendfile('public/404.html');
}
module.exports = {
  getToken: getToken,
  logout: logout,
  signUp: signUp,
  others: others
};