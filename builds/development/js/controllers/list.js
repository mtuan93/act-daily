myApp.controller('ListController', function($scope, $rootScope, $firebase, FIREBASE_URL) {
	var ref = new Firebase(FIREBASE_URL + 'users/');
	var usersArray = $firebase(ref).$asArray();
	$scope.artists = [];
	usersArray.$loaded().then(function(data) {
		for(var i = 0; i < usersArray.length; i++)
		{
			var user = usersArray.$getRecord(usersArray.$keyAt(i));
			$scope.artists.push(user);
			$scope.artistOrder = 'firstname';
		}
	}); //make sure users data is loaded
});