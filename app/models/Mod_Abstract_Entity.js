/**
 * @author René Lottes
 */

'use strict';

app.factory("Mod_Abstract_Entity",function () {
    return Mod_Abstract_Entity;
});
    function Mod_Abstract_Entity() {

	var _numType = 1,
	    _strType = "str";

	var _id;
	var _name;
	var _description;


	this.checkNum = function(toCheck) {
	    if(typeof toCheck === typeof _numType){
		return true;
	    }
	    return false;
	};

	this.checkStr = function(toCheck) {
	    if(typeof toCheck === typeof _strType){
		return true;
	    }
	    return false;
	};


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
	    if(this.checkNum(id)) {
		_id = id;
	    } else {
		throw new TypeError();
	    }
	};

	this.setName = function(name) {
	    if(this.checkStr(name)) {
		_name = name;
	    } else {
		throw new TypeError();
	    }
	};

	this.setDescription = function(description) {
	    if(this.checkStr(description) || description === undefined || description === null) {
		_description = description;
	    } else {
		throw new TypeError();
	    }
	};

	this.toJSON = function() {
	    throw new Error("Not implemented!");
	};
	
	this.parseJSON = function(json) {
	    throw new Error("Not implemented!");
	};

    }
    