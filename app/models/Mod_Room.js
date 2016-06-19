/**
 * @author René Lottes
 */

'use strict';

function Mod_Room() {
    
    Mod_Abstract_Entity.call(this);
    
    var _floor,
	_components = [];

    
    /*
     * getter
     */
    
    this.getFloor = function() {
	return _floor;
    };
    
    this.getCompnents = function() {
	return _components;
    };
    
    /*
     * setter TODO
     */
    
    this.setFloor = function(floor) {
	if(!(floor instanceof Mod_Floor)) {
	    throw new TypeError();
	}
	_floor = floor;
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
	    "descripton":this.getDescripton(),
	    "floor":this.getFloor(),
	    "components":this.getComponents()
	};
	
	return json;
    };
    
    Object.seal(this);

}

