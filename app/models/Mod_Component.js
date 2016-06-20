/**
 * @author René Lottes
 */

'use strict';

app.factory("Mod_Component",["Mod_Abstract_Entity","$injector",
    function (Mod_Abstract_Entity,$injector) {
	
//	var Mod_Category = $injector.get("Mod_Category");
//	var Mod_Room = $injector.get("Mod_Room");
//	var Mod_House = $injector.get("Mod_House");
	
    return Mod_Component;
}]);
    function Mod_Component() {

	Mod_Abstract_Entity.call(this);

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

	this.toJSON = function() {
	    var json = {
		"id":this.getId(),
		"name":this.getName(),
		"description":this.getDescription(),
		"type":this.getType(),
		"settings":this.getSettings(),
		"category":this.getCategory(),
//		"room":this.getRoom(),
//		"house":this.getHouse()
	    };

	    return json;
	};
	
//	this.parseJSON = function(json,who) {
//	    if(who === undefined || who === null) {
//		throw new Error("This function cannot be called independently!");
//	    }
//	    
//	    this.setId(json["id"]);
//	    this.setName(json["name"]);
//	    this.setDescription(json["description"]);
//	    
//	    this.setType(json["type"]);
//	    this.setSettings(json["settings"]);
//	    
//	    
//	    
//	    if(who instanceof Mod_Room) {
//		this.setRoom(who);
//		this.setHouse(who.getFloor().getHouse());
//	    } else if(who instanceof Mod_House) {
//		this.setHouse(who);
//		this.setRoom(null);
//	    } else {
//		throw new TypeError();
//	    }
//	    
//	};


    }
