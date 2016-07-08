/**
 *  @author Julia Thüroff
 */
app.directive("ngFileSelect",function(){

	  return {
	    link: function($scope,el){
	      
	      el.bind("change", function(e){
	      console.log("TEst");
	        $scope.file = (e.srcElement || e.target).files[0];
	        $scope.getFile();
	      })
	      
	    }
	    
	  }
	  
	  
	});
