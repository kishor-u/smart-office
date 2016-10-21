 let begin;
 var app = angular.module("admin", ['ui.bootstrap']);
 app.controller("adminController", function($scope, $http) {
   $scope.currentPage = 1, $scope.numPerPage = 7, $scope.maxSize = 10;
   $http.get('/gettoken').success(function(response) {
     if (response === 'null') {
       console.log('%cYou are not authorized', 'color:red;');
       location.href = "/index.html";
     } else {
       $http.get('/getfullemployee').success(function(response) {
         $scope.updatePage(response);
       });
       //Function to update list and chart
       $scope.updatePage = function(response) {
         $scope.employeelist = response;
         let Devoloperslist = 0;
         let Designerslist = 0;
         let Testerslist = 0;
         let i;
         for (i = 0; i < $scope.employeelist.length; i++) {
           if ($scope.employeelist[i].department === 'Designer') {
             Designerslist++;
           } else if ($scope.employeelist[i].department === 'Devoloper') {
             Devoloperslist++;
           } else if ($scope.employeelist[i].department === 'Tester') {
             Testerslist++;
           }
         }
         var chart = new CanvasJS.Chart("chartContainer", {
           title: {
             text: "Employees in each Depatrment"
           },
           legend: {
             maxWidth: 250,
             itemWidth: 120
           },
           data: [{
             type: "pie",
             showInLegend: true,
             legendText: "{indexLabel}",
             dataPoints: [{
               y: Devoloperslist,
               indexLabel: "Devolopers"
             }, {
               y: Testerslist,
               indexLabel: "Testers"
             }, {
               y: Designerslist,
               indexLabel: "Designers"
             }, ]
           }]
         });
         chart.render();
       }
       $scope.$watch('currentPage', function() {
         begin = {
           begin: (($scope.currentPage - 1) * $scope.numPerPage)
         }
         $http.post('/pagination', begin).success(function(response) {
           $scope.filteredemployeelist = response.data;
           console.log('%cPagination call Successfull', 'color:green;');
         });
       });
       $scope.createEmployee = function() {
         if ($scope.formdata == undefined) {
           $scope.result = 'Fields cannot be empty';
         } else if ($scope.formdata.department == null || $scope.formdata.username == null || $scope.formdata.password == null) {
           $scope.result = 'Please fill valid details';
         } else {
           $http.post('/addemployee', $scope.formdata).success(function(response) {
             $scope.result = {};
             if (response.data == 'created') {
               $scope.formdata = {};
               $scope.result = 'Employee Created Successfully';
               $http.get('/getfullemployee').success(function(response) {
                 $scope.updatePage(response);
               });
               $http.post('/pagination', begin).success(function(response) {
                 $scope.filteredemployeelist = response.data;
               });
             }
             if (response.data == 'duplicate') {
               $scope.formdata = {};
               $scope.result = 'Username already exists';
             }
           });
         }
       }
       $scope.changeAdminPassword = function() {
         $http.post('/changeadminpass', $scope.form).success(function(response) {
           console.log(response);
         });
       }
       $scope.saveId = function(id) {
         var updateid = {
           number: id
         }
         $scope.updateid = updateid;
       }
       $scope.makeAdmin = function() {
         $http.post('/makeadmin', $scope.updateid).success(function(response) {
           console.log(response);
           $http.get('/getfullemployee').success(function(response) {
             $scope.updatePage(response);
             $http.post('/pagination', begin).success(function(response) {
               $scope.filteredemployeelist = response.data;
             });
           });
         });
       }
       $scope.deleteEmployee = function(id) {
         $http.post('/deleteemployee', $scope.updateid).success(function(response) {
           console.log(response);
           $http.get('/getfullemployee').success(function(response) {
             $scope.updatePage(response);
             $http.post('/pagination', begin).success(function(response) {
               $scope.filteredemployeelist = response.data;
             });
           });
         });
       }
       $scope.notifyEmployee = function() {
         $http.post('/notify', $scope.updateid).success(function(response) {
           console.log(response);
         });
       }
       $scope.logoutAdmin = function() {
         $http.get('/logout').success(function(response) {
           console.log(response);
           location.href = '/index.html';
         });
       }
     }
   });
 });
