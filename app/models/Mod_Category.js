/**
 * @author René Lottes
 */

'use strict';

function Mod_Category() {
    
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
    
    Mod_Abstract_Entity.call(this);

}

