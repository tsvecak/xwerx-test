// Define the `xwerxApp` module
var xwerxApp = angular.module('xwerxApp', []);

// Define the `xwerxControllerClients` controller on the `xwerxApp` module
xwerxApp.controller('xwerxControllerClients', function($scope, $http) {

    // Simple GET request example:
    $http({
        method: 'GET',
        url: 'assets/dist/js/clients.json',
        headers: {
            'Content-Type': undefined
        }
    }).then(function successCallback(response) {

        // Active Clients
        $scope.activeClients = response.data.clients.activeClients;

        // Clients Increase
        $scope.clientsIncrease = response.data.clients.clientsIncrease;
        
        // Last 12 months
        $scope.last12MO = response.data.clients.lastYear;

    }, function errorCallback(response) {
        console.log('Clients Fail');
    });
    
    
});

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

    }, function errorCallback(response) {
        console.log('Alerts Fail');
    });
    
    
});