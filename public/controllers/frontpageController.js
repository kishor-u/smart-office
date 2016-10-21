var app = angular.module("frontpage", []);
app.controller("frontpageCtrl", function($scope, $http) {
  $scope.loginFunction = function() {
    if ($scope.form === undefined) {
      $scope.result = 'Fields cannot be empty';
    } else if ($scope.form.username === undefined || $scope.form.password === undefined) {
      $scope.result = 'Please enter valid details';
    } else {
      $http.post('/login', $scope.form).success(function(response) {
        console.log(response);
        $scope.form = {};
        if (response.data === 'Unauthorized') {
          $scope.result = 'No user exists';
        } else {
          if (response.data === 'admin') {
            bootbox.confirm({
              message: "Login as admin or user ? ",
              buttons: {
                confirm: {
                  label: 'admin',
                  className: 'btn-success'
                },
                cancel: {
                  label: 'user',
                  className: 'btn-info'
                }
              },
              callback: function(result) {
                if (result === true) {
                  location.href = "/admin/index.html";
                } else {
                  location.href = "/user/index.html";
                }
              }
            });
          } else {
            location.href = "/user/index.html";
          }
        }
      });
    }
  }
});