/**
 * @author René Lottes
 */

'use strict';

app.factory("Mod_Category",["Mod_Abstract_Entity","$injector",
    function (Mod_Abstract_Entity,$injector) {
	
//	var Mod_Component = $injector.get("Mod_Component");
	
    return Mod_Category;
}]);
    function Mod_Category() {

	Mod_Abstract_Entity.call(this);

	var _components = [];


	/*
	 * getter
	 */

	this.getComponents = function() {
	    return _components;
	};

	this.getDescription = function() {
	    throw new Error("No description available!");
	};

	/*
	 * setter TODO
	 */

	this.getDescription = function() {
	    throw new Error("No description available!");
	};

	this.addComponent = function(component) {
	    if(!(component instanceof Mod_Component)) {
		throw new TypeError();
	    }
	    _components.push(component);
	};

	//TODO: remove dosen't work!
	this.removeComponent = function(component) {
	    if(!(component instanceof Mod_Component || this.checkNum(component))) {
		throw new TypeError();
	    }
	    _components = _components.splice(_components.indexOf(component),1);
	};

	this.toJSON = function() {
	    var json = {
		"id":this.getId(),
		"name":this.getName(),
//		"components":this.getComponents()
	    };

	    return json;
	};

	Object.seal(this);

    }
