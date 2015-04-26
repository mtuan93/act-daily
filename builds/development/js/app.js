var myApp = angular.module('myApp', ['ngRoute',
'firebase', 'appControllers'])
.constant('FIREBASE_URL', 'https://act-daily.firebaseio.com/');

var appControllers = angular.module('appControllers',
  ['firebase']);

myApp.run(['$rootScope', '$location', function($rootScope, $location) {
  $rootScope.$on('$routeChangeError',
    function(event, next, previous, error) {
      if(error === 'AUTH_REQUIRED') {
        $location.path('/login');
      }
  });

  $rootScope.$on( "$routeChangeStart", function(event, next, current) {
      if ($rootScope.currentUser)  //already logged in
      {
        if( next.templateUrl === 'views/login.html' || 
            next.templateUrl === 'views/register.html') // if try to go somewhere else
        {
          $location.path( "/activities" ); // redirect to list.html
        } 
      }   
  });
}]);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/login', {
      templateUrl: 'views/login.html',
      controller:  'RegistrationController'
    }).
    when('/register', {
      templateUrl: 'views/register.html',
      controller:  'RegistrationController'
    }).
    when('/list/:uId', {
      templateUrl: 'views/activitiesList.html',
      controller: 'ActivitiesListController',
      resolve : {
        currentAuth: function(Authentication) {
          return Authentication.requireAuth();
        }
      }
    }).
    when('/list', {
      templateUrl: 'views/list.html',
      controller: 'ListController',
      resolve : {
        currentAuth: function(Authentication) {
          return Authentication.requireAuth();
        }
      }
    }).
    when('/activities', {
      templateUrl: 'views/activities.html',
      controller: 'ActivitiesController',
      resolve : {
        currentAuth: function(Authentication) {
          return Authentication.requireAuth();
        }
      }
    }).
    otherwise({
        redirectTo: '/activities'
    });
}]);