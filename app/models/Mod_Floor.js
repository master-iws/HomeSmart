/**
 * @author René Lottes
 */

'use strict';

function Mod_Floor() {
    
    Mod_Abstract_Entity.call(this);
    
    var _house,
	_rooms = [];

    
    /*
     * getter
     */
    
    this.getHouse = function() {
	return _house;
    };
    
    this.getRooms = function() {
	return _rooms;
    };
    
    /*
     * setter TODO
     */
    
    this.setHouse = function(house) {
	if(!(house instanceof Mod_House)) {
	    throw new TypeError();
	}
	_house = house;
    };
    
    this.addRoom = function(room) {
	if(!(room instanceof Mod_Room)) {
	    throw new TypeError();
	}
	_rooms.push(room);
    };
    
    //TODO: remove dosen't work!
    this.removeRoom = function(room) {
	if(!(room instanceof Mod_Room || this.checkNum(room))) {
	    throw new TypeError();
	}
	_rooms = _rooms.splice(_rooms.indexOf(room),1);
    };
    
    this.toJSON = function() {
	var json = {
	    "id":this.getId(),
	    "name":this.getName(),
	    "description":this.getDescription(),
	    "house":this.getHouse(),
	    "rooms":this.getRooms()
	};
	
	return json;
    };
    
    Object.seal(this);

}

