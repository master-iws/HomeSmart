/**
 * @author René Lottes
 */

'use strict';

function Mod_House() {
    
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
	_zip = zip;
    };
    
    this.setCity = function(city) {
	_city = city;
    };
    
    this.addComponent = function(component) {
	if(!(component instanceof Mod_Component)) {
	    throw new TypeError();
	}
	_components.push(component);
    };
    
    //TODO: remove dosen't work!
    this.removeComponent = function(component) {
	if(!(component instanceof Mod_Component)) {
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
	if(!(floor instanceof Mod_Floor)) {
	    throw new TypeError();
	}
	_floor = _floor.splice(_floor.indexOf(floor),1);
    };
    
    Mod_Abstract_Entity.call(this);

}

