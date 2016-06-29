
  var compareTo = function() {
    return {
      require: "ngModel",
      scope: {
        otherModelValue: "=compareToOtherPin"
      },
      link: function(scope, element, attributes, ngModel) {

        ngModel.$validators.compareTo = function(modelValue) {
        	ngModel.$setValidity('nxEqual', modelValue == scope.otherModelValue);
        	 
          return modelValue == scope.otherModelValue;
        };

        scope.$watch("otherModelValue", function() {
          ngModel.$validate();
        });
      }
    };
  };

  app.directive("compareToOtherPin", compareTo);