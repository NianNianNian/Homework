var angularTodo = angular.module('angularTodo', []);

function mainController($scope, $http) {
	$scope.formData = {};

	//when the page loads, all API calls TODOs
	$http.get('/api/todos')
		.success(function(data) {
			$scope.todos = data;
			console.log(data)
		})
	     .error(function(data) {
			console.log('Error: '+data);
		});

	//when a new TODO add, send the text to the API
	$scope.createTodo = function(){
		$http.post('/api/todos', $scope.formData)
			.success(function(data) {
				$scope.formData = {};
				$scope.todos = data;
				console.log(data);
			});
		};

	//delete a todo after finishing
	$scope.deleteTodo = function(id) {
		$http.delete('/api/todos' + id)
			.success(function(data) {
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error:' + data);
			});
		};
}
