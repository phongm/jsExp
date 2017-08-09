app.controller("div1Controller", ["$scope", "$location", function($scope, $location){
	$scope.user = "";
	$scope.pwd = "";

	$scope.loginAction = function(){
		if($scope.user == "lxl" && $scope.pwd == "746520"){
			$location.path("user/"+$scope.user+"/"+$scope.pwd);
			console.log($scope.user, $scope.pwd);
			console.log($location.path())
		}else{
			alert("您不是老司机，请重新刷卡");
			$scope.user = "";
			$scope.pwd  = "";
		}
	}
}]);