'use strict';

app.controller('RegistrationController',["$scope", "$rootScope", "$state",	function($scope, $rootScope, $state) {
	
	$scope.oldPin;
	$scope.pin;
	$scope.confirmPin;
	
	$scope.changeAdminPin = function() {
		
		if($scope.oldPin == $rootScope.adminPin)
        {
			$scope.validationMessage ="PIN wurde geändert.";
        }
        else
        	$scope.validationMessage = "Alter PIN stimmt nicht.";
    };
}]);

var compareTo = function() {
  return {
    require: "ngModel",
    scope: {
      otherModelValue: "=compareTo"
    },
    link: function(scope, element, attributes, ngModel) {

      ngModel.$validators.compareTo = function(modelValue) {
        return modelValue == scope.otherModelValue;
      };

      scope.$watch("otherModelValue", function() {
        ngModel.$validate();
      });
    }
  };
};

app.directive("compareTo", compareTo);