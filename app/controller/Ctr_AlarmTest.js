

app.controller('AlarmTestController', function($scope, $rootScope,ngToast, $state,$uibModal) {
  
   $scope.$on('washerReady', function(event, data) {
   	 	ngToast.create({content:'Spülmaschine ist fertig', animation:'slide'});
   });
   
   $scope.$on('herdReady', function(event, data) {
  	 	ngToast.create({content:'Herd ist fertig', animation:'slide'});
  });
   
   $scope.$on('washingmaschineReady', function(event, data) {
  	 	ngToast.create({content:'Waschmaschine ist fertig', animation:'slide'});
  });
   
   $scope.open = function (size) {

	   $scope.test = "test";
	    var modalInstance = $uibModal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: 'app/views/dialog/deleteHouseDialog.htm',
	      controller: 'DeleteHouseController',
	      scope: $scope,
	      size: size,
	      resolve: {
	        items: function () {
	          return $scope.items;
	        }
	      }
	    });
   };
	
});
