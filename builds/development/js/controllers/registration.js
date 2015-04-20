myApp.controller('RegistrationController', 
  function($scope, $firebaseAuth, $location, $rootScope, FIREBASE_URL, Authentication) {

    $scope.login = function() {
      Authentication.login($scope.user)
      .then(function() {
        $location.path('/list');
      }).catch(function(error) {
        $scope.message = error.message;
      });
    }; //login

    $scope.register = function() {
      Authentication.register($scope.user)
        .then(function() 
        {
          Authentication.login($scope.user)
          .then(function() 
          {
            $location.path('/list');
          });
        })
        .catch(function(error) {
          $scope.message = error.message;
        });
    }; //register

}); //RegistrationController