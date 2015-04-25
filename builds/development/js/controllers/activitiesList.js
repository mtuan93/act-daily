myApp.controller('ActivitiesListController', function($scope, $rootScope, $firebase, $routeParams,
 $location, Authentication, CountMeetings, FIREBASE_URL) {

  $scope.whichuser = $routeParams.uId;
  $scope.direction= null;
  $scope.query='';

  var targetRef = new Firebase(FIREBASE_URL + "users/" + $scope.whichuser);
  var targetUser = $firebase(targetRef).$asObject();
  $scope.targetUser = targetUser;

  var ref = new Firebase(FIREBASE_URL + "users/" +
  $scope.whichuser + '/activities');
  var activitiesList = $firebase(ref).$asArray();
  $scope.activities = activitiesList;

  $scope.showComment = function(myItem) {
    myItem.show = !myItem.show;
    if(myItem.userState == 'expanded') {
      myItem.userState = '';
    } else {
      myItem.userState = 'expanded';
    }
  }; //showLove

  $scope.giveComment = function(myItem, myGift) {
    var refLove = new Firebase(FIREBASE_URL + "users/" +
    $scope.whichuser + '/activities/' + myItem.$id + '/comments');
    var activitiesObj = $firebase(refLove);
    var giver = $rootScope.currentUser;
    var myData = {
      name: myGift,
      giver: $rootScope.currentUser.$id,
      date: Firebase.ServerValue.TIMESTAMP
    };
    activitiesObj.$push(myData);
  }; //giveLove

  $scope.deleteComment = function(actId, comment) {
    var refLove = new Firebase(FIREBASE_URL + "users/" +
    $scope.whichuser + '/activities/' + actId +
      '/comments');
    var record = $firebase(refLove);
    record.$remove(comment);
  }; //deleteLove

  $scope.isPostedUser = function(actId, key, user) {
    var refComment = new Firebase(FIREBASE_URL + "users/" + $scope.whichuser + "/activities/" + actId +
      "/comments/" + key);
    var commentObj = $firebase(refComment).$asObject();
    commentObj.$bindTo($scope, "data");
    return $scope.data.giver === user.$id;
  };
}); //ActivitiesListController