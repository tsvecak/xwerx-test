var xwerxApp=angular.module("xwerxApp",[]);xwerxApp.controller("xwerxControllerClients",function($scope,$http){$http({method:"GET",url:"assets/dist/js/clients.json",headers:{"Content-Type":void 0}}).then(function(response){$scope.activeClients=response.data.clients.activeClients,$scope.clientsIncrease=response.data.clients.clientsIncrease,$scope.last12MO=response.data.clients.lastYear},function(response){console.log("Clients Fail")})}),xwerxApp.controller("xwerxControllerAlerts",function($scope,$http){$http({method:"GET",url:"assets/dist/js/alerts.json",headers:{"Content-Type":void 0}}).then(function(response){$scope.fullData=response.data,$scope.alerts=response.data.alerts},function(response){console.log("Alerts Fail")})});