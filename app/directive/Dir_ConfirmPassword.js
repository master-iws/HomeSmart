
  var compareTo = function() {
    return {
      require: "ngModel",
      scope: {
        otherModelValue: "=compareTo"
      },
      link: function(scope, element, attributes, ngModel) {

        ngModel.$validators.compareTo = function(modelValue) {
        	console.log(modelValue);
        	console.log(scope.otherModelValue);
        	console.log(modelValue == scope.otherModelValue);
        	 ngModel.$setValidity('nxEqual', modelValue == scope.otherModelValue);
        	 
          return modelValue == scope.otherModelValue;
        };

        scope.$watch("otherModelValue", function() {
          ngModel.$validate();
        });
      }
    };
  };

  app.directive("compareTo", compareTo);