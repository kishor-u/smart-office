var express = require('express');
var mongoose = require('mongoose');
var md5 = require('md5');
var localStorage = require('localStorage');
var router = express.Router();
var employeeModel = require('../modals');
var adminController = require('../controllers/adminController');
var loginController = require('../controllers/loginController');
var userController = require('../controllers/userController');
//Login functionalities
router.get('/gettoken', loginController.getToken);
router.post('/login', loginController.signUp);
router.get('/logout', loginController.logout);
//Admin functionalities
router.get('/sample', adminController.createUser);
router.post('/addemployee', adminController.addEmployee);
router.post('/changeadminpass', adminController.changeAdminPassword);
router.post('/makeadmin', adminController.makeAdmin);
router.get('/getfullemployee', adminController.getFullEmployee);
router.post('/deleteemployee', adminController.deleteEmployee);
router.post('/pagination', adminController.pagination);
//User Functionalities
router.get('/getmydata', userController.getMyData);
router.post('/updateemployee', userController.updateUser);
router.get('/getdeptemplist', userController.getDeptList);
router.post('/notify', adminController.notify);
router.post('/api/photo', userController.uploadPhoto);
router.all('*', loginController.others);

module.exports = router;