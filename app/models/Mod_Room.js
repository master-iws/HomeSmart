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
		_icon,
	    _components = [];


	/*
	 * getter
	 */

	this.getFloor = function() {
	    return _floor;
	};
	
	this.getIcon = function() {
	    return _icon;
	};

	this.getComponents = function() {
	    return _components;
	};

	/*
	 * setter TODO
	 */
	this.setComponents = function(components) {
	    //if(!(floor instanceof Mod_Floor)) {
		//throw new TypeError();
	    //}
	    _components = components;
	};

	this.setFloor = function(floor) {
	    //if(!(floor instanceof Mod_Floor)) {
		//throw new TypeError();
	    //}
	    _floor = floor;
	};
	
	this.setIcon = function(icon) {
	    _icon = icon;
	};

	this.addComponent = function(component) {
	    if(!(component instanceof Mod_Component)) {
		throw new TypeError();
	    }
	    _components.push(component);
	};

	this.removeComponent = function(component) {
	    if(!(component instanceof Mod_Component || this.checkNum(component))) {
		throw new TypeError();
	    }
	    for(var comp in _components){
		if(_components[comp].getId() === component || _components[comp].getId() === component.getId()){
		    _components = _components.splice(comp,1);
		}
	    }
	};

	this.toJSON = function() {
	    var json = {
		"id":this.getId(),
		"name":this.getName(),
		"descripton":this.getDescription(),
//		"floor":this.getFloor(),
		"components":this.getComponents(),
		"icon": this.getIcon()
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
	    this.setIcon(json["icon"])
	    
	    if(who instanceof Mod_Floor) {
		this.setFloor(who);
	    } else {
		throw new TypeError();
	    }
	    
	    for(var id in json["components"]){
		var comp = serv_components.getNewComponentInstanceById(json["components"][id].id);
		comp.setName(json["components"][id].name);
		comp.setHouse(this.getFloor().getHouse());
		comp.setRoom(this);
		this.addComponent(comp);
	    }
	    
	};

	/**
	 * @author Julia Thüroff
	 */
	this.isConfigured= function () {
		  
		if(this.getComponents().length == 0)
			return false;
		return true;
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
	 * @author Julia Thüroff
	 */
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
	this.getSetFloor= function (value) {
		  if (angular.isDefined(value)) {
		    this.setFloor(value);
		  } else {        
		    return this.getFloor();
		  }
	
    };
    
    /**
	 * @author Julia Thüroff
	 */
	this.getEnergyData= function (typ, date) {
		var components = this.getComponents();
		for(var c in components)
		{
			if(components[c].getCategory().getName() === "Stromverbraucher" )//wenn der tag heute ist  muss der verbraucher auch an sein
			{
				switch(typ)
				{
					case 'day':
						//werte generieren
						break;
					case 'month':
						break;
					case 'year':
						break;
				}
			}
		}
    };

    /**
     * @author Matthias Jakob
     */
    this.getComponentsByCategory = function () {

	   var result ={};

	    var components = this.getComponents();

	    for(var c in components)
	    {
	    	var categoryName = components[c].getCategory().getName();
		    if(!result.hasOwnProperty(categoryName)) {
			    result[categoryName] = [];
		    }
		    result[categoryName].push(components[c]);
	    }
	    return result;
    };
    
    this.getDataset = function(typ, startDate)
    {
    	var response = {};
		response.dataset = [];
		response.label = [];
		
		if(typ === 'year')
		{
			response.dataset.push({x: new Date(startDate.year(),startDate.month(),startDate.date(),startDate.minute(),startDate.second(),startDate.millisecond())});
			for(var i=0; i < 11; i++)
			{
				var date = startDate.add(1,'month');
				response.dataset.push({x: new Date(date.year(),date.month(),date.date(),0,0,0,0)});
			}
		}
		
		if(typ === 'month')
		{
			response.dataset.push({x: new Date(startDate.year(),startDate.month(),startDate.date(),startDate.minute(),startDate.second(),startDate.millisecond())});
			var beginMonth = startDate.month();
			for(var i=0; i < 31; i++)
			{
				var date = startDate.add(1,'days');
				if(date.month() === beginMonth)
					response.dataset.push({x: new Date(date.year(),date.month(),date.date(),0,0,0,0)});
				console.log(new Date(date.year(),date.month(),date.day(),0,0,0,0));
			}
		}
		
		if(typ === 'day')
		{
			response.dataset.push({x: new Date(startDate.year(),startDate.month(),startDate.date(),startDate.minute(),startDate.second(),startDate.millisecond())});
			for(var i=0; i < 24; i++)
			{
				var date = startDate.add(1,'hours');
				response.dataset.push({x: new Date(date.year(),date.month(),date.date(),date.hour(),0,0,0)});
			}
		}
		
		return response;
    }
    
    this.getEnergyData = function(typ, startDate)
	{
		var response = this.getDataset(typ,startDate);
		
		for(var c in this.getComponents())
		{
			for(var d in response.dataset)
			{
				var name = "series_"+c;
				response.dataset[d][name] = Math.round(((Math.random() * (4 - 2)) + 2)*5);
			}
			response.label.push(this.getComponents()[c].getName());
		}
		return response;
	};
	
	this.getWaterData = function(typ, startDate)
	{
		var response = this.getDataset(typ,startDate);
		
		for(var c in this.getComponents())
		{
			for(var d in response.dataset)
			{
				var name = "series_"+c;
				response.dataset[d][name] = Math.round(((Math.random() * (4 - 2)) + 2)*5);
			}
			response.label.push(this.getComponents()[c].getName());
		}
		return response;
	};

}
