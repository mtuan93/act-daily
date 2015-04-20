myApp.controller('StatusController', function($scope, 
  $location, $rootScope, Authentication) {

  $scope.logout = function() {
    Authentication.logout();
    $rootScope.currentUser = '';
    $location.path('/login');
  }; //logout

}); //StatusController