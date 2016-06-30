/**
 * @author René Lottes
 */
'use strict';

app.service("MainService", ["Mod_House","Mod_Component","Mod_Floor","Mod_Category","Mod_Room","ComponentService","$rootScope",
    function(Mod_House,Mod_Component,Mod_Floor,Mod_Category,Mod_Room,componentService,$rootScope) {
    
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
	var floorId=1;
	var house_arr=[];
	
	if(stored){
	    $rootScope.nextHouseId = -1;
	    for(var id in stored){
			var house = new Mod_House();
			house.parseJSON(stored[id],componentService);
			if(house.getId() > $rootScope.nextHouseId)
				$rootScope.nextHouseId = house.getId();
			house_arr.push(house);
	    }
	    $rootScope.nextHouseId++;
	    
	} else {
	    
		$rootScope.nextHouseId = 3;
		$rootScope.nextFloorId = 3;
		$rootScope.nextRoomId = 5;
	    for(var houses=1;houses<3;houses++){
		var house = new Mod_House();
		    house.setId(houses);
		    house.setName("House "+houses);
		    house.setDescription("This is our Home!");
		    house.setCity("Naila");
		    house.setZip("95119");
		    
		    var dashboard = {};
			dashboard.quicklinks = [];
			dashboard.controls = [];
			house.setDashboard(dashboard);
			
			var wlan = {};
			wlan.ssid = "123";
			wlan.password = "123";
			wlan.status = true;
			house.setWlan(wlan);

		    for(var floors=1;floors<3;floors++){
			var floor = new Mod_Floor();
			    floor.setId(floorId);
			    floorId++;
			    floor.setName("Floor "+floors);
			    floor.setDescription("Desc: H"+houses+"-F"+floors);
			    floor.setHouse(house);
			    

			    for(var rooms=1;rooms<5;rooms++){
				var room = new Mod_Room();
				    room.setId(getNextId());
				    room.setName("R"+rooms);
				    room.setDescription("Desc: H"+houses+"-F"+floors+"-R"+rooms);
				    var c = componentService.getComponentById(7001);
				    c.setName("Wohnzimmerleuchte");
				    room.addComponent(c);
				    
				    var s = componentService.getComponentById(6003);
				    s.setName("Balkonbeschattung");
				    room.addComponent(s);

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
    
    function getSettings()
    {
    	var stored = getStored("config");
    	var settings = new Mod_GlobalSettings();
    	if(stored){
    		settings.parseJSON(stored);
    	}else{
    		settings.setUser({name:'maxmustermann',password:'Test12'});
    		settings.setAdminPin("12345");
    	}
    	return settings;
    }
    
    function saveSettings(settings) {
	store(JSON.stringify(settings),"config");
    }
    
    var id=0;
    function getNextId() {
    	$rootScope.nextId = id;
    	return id++;
    }
    
    return {
    getNextId:getNextId,
	getHouses:getHouses,
	saveHouses:saveHouses,
	reset:reset,
	getSettings:getSettings,
	saveSettings:saveSettings
    };
}]);