// Define the `xwerxControllerAlerts` controller on the `xwerxApp` module
xwerxApp.controller('xwerxControllerAlerts', function($scope, $http) {

    // Simple GET request example:
    $http({
        method: 'GET',
        url: 'assets/dist/js/alerts.json',
        headers: {
            'Content-Type': undefined
        }
    }).then(function successCallback(response) {
        $scope.fullData = response.data;

        // Last 12 months
        $scope.alerts = response.data.alerts;

        $scope.maxAlerts=5;

    }, function errorCallback(response) {
        console.log('Alerts Fail');
    });
    
    
});