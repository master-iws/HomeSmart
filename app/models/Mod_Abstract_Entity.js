/**
 * @author René Lottes
 */

'use strict';

 function Mod_Abstract_Entity() {
     
    var _numType = 1,
	_strType = "str";

    var _id;
    var _name;
    var _description;
    
    
    /*
     * getter
     */
    
    this.getId = function() {
	return _id;
    };

    this.getName = function() {
	return _name;
    };

    this.getDescription = function() {
	return _description;
    };
    
    /*
     * setter
     */
    
    this.setId = function(id) {	
	_id = id;
    };

    this.setName = function(name) {
	_name = name;
    };

    this.setDescription = function(description) {
	_description = description;
    };
    
    Object.seal(this);
    
}
    
