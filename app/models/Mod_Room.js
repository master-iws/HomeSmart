/**
 * @author René Lottes
 */

'use strict';

app.factory("Mod_Room",["Mod_Abstract_Entity","$injector",
    function (Mod_Abstract_Entity,$injector) {
	
//	var Mod_Floor = $injector.get("Mod_Floor");
//	var Mod_Component = $injector.get("Mod_Component");
	
    return Mod_Room;
}]);
    function Mod_Room() {

	Mod_Abstract_Entity.call(this);

	var _floor,
	    _components = [];


	/*
	 * getter
	 */

	this.getFloor = function() {
	    return _floor;
	};

	this.getComponents = function() {
	    return _components;
	};

	/*
	 * setter TODO
	 */

	this.setFloor = function(floor) {
	    if(!(floor instanceof Mod_Floor)) {
		throw new TypeError();
	    }
	    _floor = floor;
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

	this.toJSON = function() {
	    var json = {
		"id":this.getId(),
		"name":this.getName(),
		"descripton":this.getDescription(),
//		"floor":this.getFloor(),
		"components":this.getComponents()
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
	    
	    if(who instanceof Mod_Floor) {
		this.setFloor(who);
	    } else {
		throw new TypeError();
	    }
	    
	    for(var id in json["components"]){
		var comp = serv_components.getComponentById(json["components"][id].id);
		comp.setHouse(this.getFloor().getHouse());
		comp.setRoom(this);
		this.addComponent(comp);
	    }
	    
	};

	
	/**
	 * @author Julia Thüroff
	 */
	this.setLight= function (value) {
		  
		this.setComponentsOfCategoryToValu("Beleuchtung",value);
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
		  
		var components = this.getComponents();
	    		for(var c in components)
	    		{
	    			if(components[c].getCategory().getName() === category )
	    				components[c].getSettings()[0]=value;
	    		}
	    	
	    	
	};

    /**
     * @author Matthias Jakob
     */
    this.getComponentsByCategory = function () {

	    var result = [];

	    var components = this.getComponents();

	    for(var c in components)
	    {
		    if(!(components[c].getCategory().getName() in result)) {
			    result[components[c].getCategory().getName()] = [];
		    }
		    result[components[c].getCategory().getName()].push(components[c]);
	    }
	    return result;
    };

}
