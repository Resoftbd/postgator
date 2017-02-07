var myApp = angular.module("postgator", []);

myApp.controller('postController', function($scope, $http, $httpParamSerializerJQLike){
	//console.log("In myController...");

	function init(){
		$scope.newUser = {};
		$scope.clickedUser = {};
		$scope.msg="";
		$scope.msgType="";

		/*$scope.users = [
		{username: "testing", fullName: "testdddd", email: "test.com"},
		{username: "fdg", fullName: "testdddd", email: "ffg.com"},
		{username: "testing", fullName: "testdddd", email: "test.com"}
		];

		$http.get("http://127.0.0.1:3000/read/").then(function(response){
			$scope.users = response.data;
			console.log($scope.users);
		});*/
	}
	init();

	$scope.saveUser=function(){
		console.log($scope.newUser);
		//console.log($scope.newUser);
		//$scope.users.push($scope.newUser);
		$http({
			url:'http://127.0.0.1:3000/register/',
			method: 'POST',
			data: $httpParamSerializerJQLike($scope.newUser),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).success(function(response){
		   console.log(response);
		   init();
			$scope.msg="New User Added Successfully!!!";
			$scope.msgType="success";
		});
	};

	$scope.selectUser=function(user){
		//console.log(user);
		$scope.clickedUser = user;
	};

	$scope.updateUser=function(user){$http({
			url:'http://127.0.0.1:3000/update/',
			method: 'POST',
			data: $httpParamSerializerJQLike($scope.clickedUser),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).success(function(response){
		   console.log(response);
		   init();
			$scope.msg="Selected User Updated Successfully!!!";
			$scope.msgType="success";
		});
	};

	$scope.deleteUser=function(){
		//$scope.users.splice($scope.users.indexOf($scope.clickedUser),1);
		$http({
			url:'http://127.0.0.1:3000/delete/',
			method: 'POST',
			data: $httpParamSerializerJQLike({'_id': $scope.clickedUser._id}),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).success(function(response){
		   console.log(response);
		   init();
			$scope.msg="Deleted Successfully!!!";
			$scope.msgType="danger";
		});
	};
});
