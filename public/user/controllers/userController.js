var app = angular.module("user", []);
app.controller("userController", function($scope, $http) {
  $http.get('/gettoken').success(function(response) {
    if (response === 'null') {
      console.log('%cYou are not authorized','color:red;');
      location.href = "/index.html";
    } else {
      $http.get('/getdeptemplist').success(function(response) {
        $scope.coworkers = response.data;
      });
      $http.get('/getfullemployee').success(function(response) {
        $scope.workers = response;
      });
      $http.get('/getmydata').success(function(response) {
        $scope.formdata = response.data;
        $scope.percentageProgress = ((Object.keys($scope.formdata).length - 4) / 8) * 100;
      });
      $scope.updateEmployee = function() {
        $http.post('/updateemployee', $scope.formdata).success(function(response) {
          console.log(response);
          if (response.data === 'updated') {
            $scope.result = 'Your profile has been updated..!!';
            document.getElementById("fieldset").setAttribute("disabled", "true");
            document.getElementById("updatebutton").setAttribute("disabled", "true");
            document.getElementById("editbutton").removeAttribute("disabled");
            $http.get('/getmydata').success(function(response) {
              $scope.formdata = response.data;
              $scope.percentageProgress = ((Object.keys($scope.formdata).length - 4) / 8) * 100;
            });
          }
        });
      }
      $scope.changeFieldset = function() {
        document.getElementById("fieldset").removeAttribute("disabled");
        document.getElementById("updatebutton").removeAttribute("disabled");
        document.getElementById("editbutton").setAttribute("disabled", "true");
      }
      $scope.logout = function() {
        $http.get('/logout').success(function(response) {
          console.log(response);
          location.href = '/index.html';
        });
      }
    }
  });
});