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