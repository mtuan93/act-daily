myApp.controller('ActivitiesController',
  function($scope, $rootScope, $firebase,
    CountMeetings, FIREBASE_URL) {

  var ref = new Firebase(FIREBASE_URL + '/users/' + 
    $rootScope.currentUser.$id + '/activities');

  var activitiesInfo = $firebase(ref);
  var activitiesObj = activitiesInfo.$asObject();

  activitiesObj.$loaded().then(function(data) {
    $scope.activities = data;
  }); //make sure activities data is loaded


  $scope.addActivity = function() {
    activitiesInfo.$push({
      name: $scope.activityname,
      time: $scope.activitytime,
      date: Firebase.ServerValue.TIMESTAMP
    }).then(function() {
      $scope.activityname='';
      $scope.activitytime='';
    });
  }; //addactivity

  $scope.deleteActivity = function(key) {
    activitiesInfo.$remove(key);
  }; //deleteactivity


}); //ActivitiesController