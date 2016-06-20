/**
 * @author René Lottes
 */
'use strict';

app.service("MainService", ["Mod_House","Mod_Component","Mod_Floor","Mod_Category","Mod_Room","ComponentService",
    function(Mod_House,Mod_Component,Mod_Floor,Mod_Category,Mod_Room,componentService) {
    
    function getStored(prefix) {
	if(typeof(Storage) !== undefined){
	    return JSON.parse(localStorage.getItem("homeSmart-"+prefix));
	} else {
	    return false;
	}
    }
    
    function store(houses,prefix) {
	if(typeof(Storage) !== undefined){
	    return localStorage.setItem("homeSmart-"+prefix,houses);
	}
    }
    function reset() {
	if(typeof(Storage) !== undefined){
	    return localStorage.removeItem("homeSmart-houses");
	    return localStorage.removeItem("homeSmart-config");
	}
    }
    
    function getHouses() {
	var stored = getStored("houses");
	var house_arr=[];
	
	if(stored){
	    
	    for(var id in stored){
		var house = new Mod_House();
		house.parseJSON(stored[id],componentService);
		house_arr.push(house);
	    }
	    
	} else {
	    
	    for(var houses=1;houses<3;houses++){
		var house = new Mod_House();
		    house.setId(getNextId());
		    house.setName("House "+houses);
		    house.setDescription("This is our Home!");
		    house.setCity("Naila");
		    house.setZip("95119");

		    for(var floors=1;floors<3;floors++){
			var floor = new Mod_Floor();
			    floor.setId(getNextId());
			    floor.setName("House "+houses+" - Floor "+floors);
			    floor.setDescription("Desc: H"+houses+"-F"+floors);
			    floor.setHouse(house);

			    for(var rooms=1;rooms<5;rooms++){
				var room = new Mod_Room();
				    room.setId(getNextId());
				    room.setName("H"+houses+" - F"+floors+" - R"+rooms);
				    room.setDescription("Desc: H"+houses+"-F"+floors+"-R"+rooms);
				    room.addComponent(componentService.getComponentById(7001));

				floor.addRoom(room);
			    }
			house.addFloor(floor);
		    }
		house_arr.push(house);
	    }
	    
	}
	return house_arr;
	
    }
    
    function saveHouses(houses) {
	store(JSON.stringify(houses),"houses");
    }
    
    function getSettings() {
	var stored = getStored("config");
	
	if(stored){
	    return stored;
	} else {
	    
	}
    }
    
    function saveSettings(settings) {
	store(JSON.stringify(settings),"config");
    }
    
    var id=0;
    function getNextId() {
	return id++;
    }
    
    return {
	getHouses:getHouses,
	saveHouses:saveHouses,
	reset:reset,
	getSettings:getSettings,
	saveSettings:saveSettings
    };
}]);
