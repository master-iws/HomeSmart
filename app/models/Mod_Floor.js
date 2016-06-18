/**
 * @author René Lottes
 */

'use strict';

function Mod_Floor() {
    
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
    
    Mod_Abstract_Entity.call(this);

}

