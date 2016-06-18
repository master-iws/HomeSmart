/**
 * @author René Lottes
 */

'use strict';

function Mod_Component() {
    
    var _type,
	_settings = [],
	_category,
	_room,
	_house;


    /*
     * getter
     */

    this.getType = function() {
	return _type;
    };
    
    this.getSettings = function() {
	return _settings;
    };
    
    this.getCategory = function() {
	return _category;
    };
    
    this.getRoom = function() {
	return _room;
    };
    
    this.getHouse = function() {
	return _house;
    };
    
    /*
     * setter TODO
     */
    
    
    Mod_Abstract_Entity.call(this);

}

