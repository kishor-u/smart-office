var employeeModel = require('../modals');
var mongoose = require('mongoose');
var md5 = require('md5');
var localStorage = require('localStorage');

function createUser(req, res, next) {
  employeeModel.create({
    username: 'kd',
    name: 'Krishandev',
    password: md5('123'),
    department: 'Manager',
    status: 'admin'
  }, function(err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send('created');
    }
  });
}
function pagination(req, res) {
  employeeModel.find().skip(req.body.begin).limit(7).exec(function(err, data) {
    if (err) {
      throw err;
    } else {
      res.json({
        status: 200,
        data: data
      });
    }
  });
}
function addEmployee(req, res) {
  employeeModel.findOne({
    username: req.body.username
  }, function(err, data) {
    if (data != null) {
      res.json({
        status: 409,
        data: 'duplicate'
      });
    } else {
      employeeModel.create({
        name: req.body.name,
        username: req.body.username,
        password: md5(req.body.password),
        department: req.body.department,
        status: 'user'
      }, function(err, data) {
        if (err) {
          res.send(err);
        } else {
          res.json({
            status: 200,
            data: 'created'
          });
        }
      });
    }
  });
}
function changeAdminPassword(req, res) {
  employeeModel.findById(localStorage.getItem('IDkey'), function(err, data) {
    if (err) {
      throw err;
    } else {
      data.password = md5(req.body.newpassword),
        data.save(function(err) {
          if (err) {
            throw err;
          }
          res.json({
            status: 204,
            data: 'Admin password updated'
          });
        });
    }
  });
}
function makeAdmin(req, res) {
  employeeModel.findOne({
    _id: req.body.number
  }, function(err, data) {
    if (err) {
      throw err;
    } else {
      data.status = 'admin';
      data.save(function(err) {
        if (err) {
          throw err;
        }
        res.json({
          status: 204,
          data: 'User has updated to admin'
        });
      });
    }
  });
}
function deleteEmployee(req, res) {
  employeeModel.findOne({
    _id: req.body.number
  }, function(err, data) {
    if (data == null) {
      res.json({
        status: 409,
        data: 'Employee didnt exist'
      });
    } else {
      employeeModel.remove({
        _id: req.body.number
      }, function(err, data) {
        if (err) {
          res.send(err);
        }
        res.json({
          status: 200,
          data: 'Employee Deleted'
        });
      });
    }
  });
}
function notify(req, res) {
  employeeModel.findById(req.body.number, function(err, data) {
    if (err) {
      throw err;
    } else {
      data.message = 'Please meet admin',
        data.save(function(err) {
          if (err) {
            throw err;
          }
          res.json({
            status: 200,
            data: 'User is notified by admin'
          });
        });
    }
  });
}
function getFullEmployee(req, res) {
  if (localStorage.getItem('IDkey') !== null) {
    return employeeModel.find().then(function(data) {
      res.json(data);
    }, function(err) {
      res.send(err);
    });
  } else {
    return res.json({
      status: 404,
      data: 'Unauthorized'
    });
  }
}
module.exports = {
  createUser: createUser,
  addEmployee: addEmployee,
  makeAdmin: makeAdmin,
  pagination: pagination,
  getFullEmployee: getFullEmployee,
  changeAdminPassword: changeAdminPassword,
  deleteEmployee: deleteEmployee,
  notify: notify
};