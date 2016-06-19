/**
 * @author René Lottes
 */

'use strict';

function Mod_House() {
    
    Mod_Abstract_Entity.call(this);
    
    var _zip,
	_city,
	_components = [],
	_floors = [];


    /*
     * getter
     */

    this.getZip = function() {
	return _zip;
    };
    
    this.getCity = function() {
	return _city;
    };
    
    this.getComponents = function() {
	return _components;
    };
    
    this.getFloors = function() {
	return _floors;
    };
    
    /*
     * setter
     */
    
    this.setZip = function(zip) {
	if(this.checkStr(zip)) {
	    _zip = zip;
	} else {
	    throw new TypeError();
	}
    };
    
    this.setCity = function(city) {
	if(this.checkStr(city)) {
	    _city = city;
	} else {
	    throw new TypeError();
	}
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
    
    this.addFloor = function(floor) {
	if(!(floor instanceof Mod_Floor)) {
	    throw new TypeError();
	}
	
    };
    
    //TODO: remove dosen't work!
    this.removeFloor = function(floor) {
	if(!(floor instanceof Mod_Floor || this.checkNum(floor))) {
	    throw new TypeError();
	}
	_floor = _floor.splice(_floor.indexOf(floor),1);
    };
    
    this.toJSON = function() {
	var json = {
	    "id":this.getId(),
	    "name":this.getName(),
	    "description":this.getDescription(),
	    "zip":this.getZip(),
	    "city":this.getCity(),
	    "components":this.getComponents(),
	    "floors":this.getFloors()
	};
	
	return json;
    };
    
    Object.seal(this);

}

