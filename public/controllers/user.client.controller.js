var myApp = angular.module("postgator", []);

myApp.controller('postController', function($scope, $http, $httpParamSerializerJQLike,$window){
	//console.log("In myController...");

	function init(){
        $scope.user = {};
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
		});
		if(sessionStorage.loggedIn!= true){
            $window.location.href = 'http://localhost:3000/views/index.html';
        }
        if(sessionStorage.loggedIn == true){
            $window.location.href = 'http://localhost:3000/views/menu.html';
        }*/
	}
	init();


    $scope.login=function(){
    	$http({
        url:'http://127.0.0.1:3000/login/',
        method: 'POST',
        data: $httpParamSerializerJQLike($scope.user),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
          /*  init();
                $scope.msg="Successfully created new user!!!";
                $scope.msgType="success";
            */
            $window.location.href = 'http://localhost:3000/views/menu.html';

        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            init();
            $scope.msg="Wrong Username or Password!!!";
            $scope.msgType="danger";
        });
    };

	$scope.saveUser=function(){

        
/*---------------------------- encrypting!!-aoyan ----------------------------------------*/
			var jdata=angular.toJson($scope.newUser); //Converts Angular data into a JSON formatted string.. angular.fromJson() reverts it back
			var obj = JSON.parse(jdata);   // It parses whole JSON string into std object by first string seg
			obj.users_email="i have changed it...Booooom";
			$scope.newUser=angular.fromJson(obj);
			console.log($scope.newUser);  //obj.users_email calls users_email value from it's reference
/*----------------------------------------------------------------------------------------------------------*/
		$http({
			url:'http://127.0.0.1:3000/register/',
			method: 'POST',
			data: $httpParamSerializerJQLike($scope.newUser),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $window.location.href = 'http://localhost:3000/views/social_login.html';
            init();
            $scope.msg="Successfully created new user!!!";
            $scope.msgType="success";

        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            init();
            $scope.msg="Failed!!!";
            $scope.msgType="danger";
        });

	};
    $scope.saveFb=function(fb_id,fb_name){

        $http({
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
