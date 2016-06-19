/**
 * @author René Lottes
 */

'use strict';

app.service("MainService", ["Mod_House","Mod_Component","Mod_Floor","Mod_Category","Mod_Room",
    function(Mod_House,Mod_Component,Mod_Floor,Mod_Category,Mod_Room) {
    
    function getStored() {
	if(typeof(Storage) !== undefined){
	    return localStorage.getItem("homeSmart-houses");
	} else {
	    return false;
	}
    }
    
    function store(houses) {
	if(typeof(Storage) !== undefined){
	    return localStorage.setItem("homeSmart-houses",houses);
	}
    }
    function reset() {
	if(typeof(Storage) !== undefined){
	    return localStorage.removeItem("homeSmart-houses");
	    return localStorage.removeItem("homeSmart-config");
	}
    }
    
    function getHouses() {
	var houses = getStored();
	
	if(houses){
	    return houses;
	} else {
	    	
	    var houses=[];
	    
	    for(var houses=1;houses<5;houses++){
		var house = new Mod_House();
		    house.setId(getNextId());
		    house.setName("House "+houses);
		    house.setDescription("This is our Home!");
		    house.setCity("Naila");
		    house.setZip("95119");

		    for(var floors=1;floors<5;floors++){
			var floor = new Mod_Floor();
			    floor.setId(getNextId());
			    floor.setName("House 1 - Floor "+floors);
			    floor.setDescription("Desc: H1-F"+floors);
			    floor.setHouse(house);

			    for(var rooms=1;rooms<5;rooms++){
				var room = new Mod_Room();
				    room.setId(getNextId());
				    room.setName("H1 - F"+floors+" - R"+rooms);
				    room.setDescription("Desc: H1-F"+floors+"-R"+rooms);

				floor.addRoom(room);
			    }
			house.addFloor(floor);
		    }
		houses.push(house);
	    }
	    
	    return houses;
	    
	}
	
    }
    
    function saveHouses(houses) {
	store(houses);
    }
    
    var id=0;
    function getNextId() {
	return id++;
    }
    
    return {
	getHouses:getHouses,
	saveHouses:saveHouses,
	reset:reset
    };
}]);

