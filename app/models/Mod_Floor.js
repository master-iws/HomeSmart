/**
 * @author René Lottes
 */

'use strict';

app.factory("Mod_Floor",["Mod_Abstract_Entity","$injector",
    function (Mod_Abstract_Entity,$injector) {
	
// var Mod_House = $injector.get("Mod_House");
// var Mod_Room = $injector.get("Mod_Room");
	
    return Mod_Floor;
}]);
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

	this.getRoomsInKeyValueArray = function() {
	    var rooms = [];
	    for (var r in _rooms) {
		rooms[_rooms[r].getId()] = _rooms[r];
	    }
	    return rooms;
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

	this.removeRoom = function(room) {
	    if(!(room instanceof Mod_Room || this.checkNum(room))) {
		throw new TypeError();
	    }
	    for(var r in _rooms){
		if(_rooms[r].getId() === room || _rooms[r].getId() === room.getId()){
		    _rooms = _rooms.splice(r,1);
		}
	    }
	};

	this.toJSON = function() {
	    var json = {
		"id":this.getId(),
		"name":this.getName(),
		"description":this.getDescription(),
// "house":this.getHouse(),
		"rooms":this.getRooms()
	    };

	    return json;
	};
	
	this.parseJSON = function(json,who,serv_components) {
	    if(who === undefined || who === null) {
		throw new Error("This function cannot be called independently!");
	    }
	    if(serv_components === undefined || serv_components === null) {
		throw new Error("This function cannot be called independently!");
	    }
	    
	    this.setId(json["id"]);
	    this.setName(json["name"]);
	    this.setDescription(json["description"]);
	    
	    if(who instanceof Mod_House) {
		this.setHouse(who);
	    } else {
		throw new TypeError();
	    }
	    
	    for(var id in json["rooms"]){
		var room = new Mod_Room();
		room.parseJSON(json["rooms"][id],this,serv_components);
		this.addRoom(room);
	    }
	};

	this.getSetName= function (value) {
		  if (angular.isDefined(value)) {
		    this.setName(value);
		  } else {        
		    return this.getName();
		  }
	
  };
  
  
  /**
	 * @author Julia Thüroff
	 */
	this.isConfigured= function () {
		  
		for(var r in this.getRooms())
		{
			if(!this.getRooms()[r].isConfigured())
				return false;
		}
		
		return true;
	};
  
  /**
	 * @author Julia Thüroff
	 */
	this.setLight= function (value) {
		  
		this.setComponentsOfCategoryToValu("Beleuchtung", value);
	};
	
	/**
	 * @author Julia Thüroff
	 */
	this.setShadowing= function (value) {
		  
		this.setComponentsOfCategoryToValu("Beschattung", value);
	};
	
	/**
	 * @author Julia Thüroff
	 */
	this.setConsumer= function (value) {
		  
		this.setComponentsOfCategoryToValu("Verbraucher", value);
	};
	
	/**
	 * @author Julia Thüroff
	 */
	this.setComponentsOfCategoryToValue= function (category, value) {
		  
		var rooms = this.getRooms();
	    	for(var r in rooms)
	    	{
	    		var components = rooms[r].getComponents();
	    		for(var c in components)
	    		{
	    			if(components[c].getCategory().getName() === category )
	    				components[c].getSettings()[0]=value;
	    		}
	    	}
	    	
	};
  
    }
