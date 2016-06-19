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
    
    this.setType = function(type) {
	if(this.checkStr(type)) {
	    _type = type;
	} else {
	    throw new TypeError();
	}
    };
    
    this.setSettings = function(settings) {
	return _settings;
    };
    
    this.setCategory = function(category) {
	if(!(category instanceof Mod_Category)) {
	    throw new TypeError();
	}
	_category = category;
    };
    
    this.setRoom = function(room) {
	if(!(room instanceof Mod_Room)) {
	    throw new TypeError();
	}
	_room = room;
    };
    
    this.setHouse = function(house) {
	if(!(house instanceof Mod_House)) {
	    throw new TypeError();
	}
	_house = house;
    };
    
    
    Mod_Abstract_Entity.call(this);

}

