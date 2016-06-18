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
    
    this.setDescription = function() {
	throw new Error("No description available!");
    };
    
    Mod_Abstract_Entity.call(this);

}

