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
	console.info("Store with prefix: %s",prefix);
	if(typeof(Storage) !== undefined){
	    return localStorage.setItem("homeSmart-"+prefix,houses);
	}
    }
    function reset() {
	if(typeof(Storage) !== undefined){
	    return localStorage.removeItem("homeSmart-houses");
	    return localStorage.removeItem("homeSmart-config");
	}
	console.warn("Reseted all houses and settings!");
    }
    
    
    function getHouses() {
	console.groupCollapsed("MainService::getHouses");
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
	    house_arr.push(getDemoHome());
	}
	console.groupCollapsed("House Array");
	console.info(JSON.stringify(house_arr,null,2));
	console.groupEnd();
	console.groupEnd();
	return house_arr;
    }
    
    function getDemoHome() {
	console.groupCollapsed("MainService::getDemoHome");
	$rootScope.nextHouseId = 0;
	$rootScope.nextFloorId = 0;
	$rootScope.nextRoomId = 0;
	
	var home = new Mod_House();
	    home.setId($rootScope.nextHouseId++);
	    home.setName("Home sweet home");
	    home.setDescription("This is our Home!");
	    home.setCity("Naila");
	    home.setZip("95119");
	    //Erdgeschoss
	    var floor = new Mod_Floor();
		floor.setId($rootScope.nextFloorId++);
		floor.setName("Erdgeschoss");
		floor.setDescription("Desc: H0-F0");
		floor.setHouse(home);
		// <editor-fold defaultstate="collapsed" desc="Küche">
		var room = new Mod_Room();
		    room.setId($rootScope.nextRoomId++);
		    room.setName("Küche");
		    room.setFloor(floor);
		    var c = componentService.getComponentById(11001); //MutiRoomaudio
		    room.addComponent(c);
		    var c = componentService.getComponentById(12001); //Heizung
		    room.addComponent(c);
		    var c = componentService.getComponentById(13002); //Rauchmelder
		    room.addComponent(c);
		    var c = componentService.getComponentById(8002); //Fensterkontakt
			c.setName("Fenster spüle");
		    room.addComponent(c);
		    var c = componentService.getComponentById(8002); //Fensterkontakt
			c.setName("Fenster Garten");
		    var c = componentService.getComponentById(8004); //Beschattung
			c.setName("Fenster spüle");
		    room.addComponent(c);
		    var c = componentService.getComponentById(8004); //Beschattung
			c.setName("Fenster Garten");
		    room.addComponent(c);
		    var c = componentService.getComponentById(5001); //Stromverbraucher
			c.setName("Mixer");
		    room.addComponent(c);
		    var c = componentService.getComponentById(5001); //Stromverbraucher
			c.setName("Toaster");
		    room.addComponent(c);
		    var c = componentService.getComponentById(5001); //Stromverbraucher
			c.setName("Thermomix");
		    room.addComponent(c);
		    var c = componentService.getComponentById(5001); //Stromverbraucher
			c.setName("Wasserkocher");
		    room.addComponent(c);
		    var c = componentService.getComponentById(5001); //Stromverbraucher
			c.setName("Kühlschrank");
		    room.addComponent(c);
		    var c = componentService.getComponentById(5001); //Stromverbraucher
			c.setName("Spülmaschine");
		    room.addComponent(c);
		    var c = componentService.getComponentById(5001); //Stromverbraucher
			c.setName("Kaffeemaschine");
		    room.addComponent(c);
		    var c = componentService.getComponentById(5001); //Stromverbraucher
			c.setName("Herd");
		    room.addComponent(c);
		    var c = componentService.getComponentById(5002); //Wasserverbraucher
			c.setName("Spüle");
		    room.addComponent(c);
		    var c = componentService.getComponentById(5002); //Wasserverbraucher
			c.setName("Spülmaschine");
		    room.addComponent(c);
		    var c = componentService.getComponentById(7001); //Licht normal
			c.setName("Spüle");
		    room.addComponent(c);
		    var c = componentService.getComponentById(7001); //Licht normal
			c.setName("Herd");
		    room.addComponent(c);
		    var c = componentService.getComponentById(7002); //Licht dimmer
			c.setName("Hauptlicht");
		    room.addComponent(c);
		    var c = componentService.getComponentById(1004); //Kühlschrank
		    room.addComponent(c);
		    var c = componentService.getComponentById(1003); //Spülmaschine
		    room.addComponent(c);
		    var c = componentService.getComponentById(1001); //Kaffeemaschine
		    room.addComponent(c);
		    var c = componentService.getComponentById(1002); //Herd
		    room.addComponent(c);
		floor.addRoom(room);
		// </editor-fold>
		// <editor-fold defaultstate="collapsed" desc="Wohnzimmer">
		var room = new Mod_Room();
		    room.setId($rootScope.nextRoomId++);
		    room.setName("Wohnzimmer");
		    room.setFloor(floor);
		    var c = componentService.getComponentById(11001); //MutiRoomaudio
		    room.addComponent(c);
		    var c = componentService.getComponentById(12001); //Heizung
		    room.addComponent(c);
		    var c = componentService.getComponentById(13002); //Rauchmelder
		    room.addComponent(c);
		    var c = componentService.getComponentById(8002); //Fensterkontakt
			c.setName("Terassentür");
		    room.addComponent(c);
		    var c = componentService.getComponentById(8002); //Fensterkontakt
			c.setName("Terassenfenster");
		    room.addComponent(c);
		     var c = componentService.getComponentById(8002); //Fensterkontakt
			c.setName("Straßenfenster");
		    var c = componentService.getComponentById(8004); //Beschattung
			c.setName("Terassentür");
		    room.addComponent(c);
		    var c = componentService.getComponentById(8004); //Beschattung
			c.setName("Terassenfenster");
		    room.addComponent(c);
		     var c = componentService.getComponentById(8004); //Beschattung
			c.setName("Straßenfenster");
		    room.addComponent(c);
		    var c = componentService.getComponentById(5001); //Stromverbraucher
			c.setName("TV");
		    room.addComponent(c);
		    var c = componentService.getComponentById(5001); //Stromverbraucher
			c.setName("Beamer");
		    room.addComponent(c);
		    var c = componentService.getComponentById(5001); //Stromverbraucher
			c.setName("Ladegerät");
		    room.addComponent(c);
		    var c = componentService.getComponentById(5001); //Stromverbraucher
			c.setName("Zimmerbrunnen");
		    room.addComponent(c);
		    var c = componentService.getComponentById(7004); //Licht Komplett
			c.setName("Hauptlicht");
		    room.addComponent(c);
		    var c = componentService.getComponentById(7002); //Licht dimmer
			c.setName("Leselampe");
		    room.addComponent(c);
		    var c = componentService.getComponentById(4002); //TV
		    room.addComponent(c);
		    var c = componentService.getComponentById(4001); //Beamer
		    room.addComponent(c);
		    var c = componentService.getComponentById(4003); //Leinwand
		    room.addComponent(c);
		floor.addRoom(room);
		// </editor-fold>
		// <editor-fold defaultstate="collapsed" desc="Badezimmer EG">
		var room = new Mod_Room();
		    room.setId($rootScope.nextRoomId++);
		    room.setName("Badezimmer EG");
		    room.setFloor(floor);
		    var c = componentService.getComponentById(11001); //MutiRoomaudio
		    room.addComponent(c);
		    var c = componentService.getComponentById(12001); //Heizung
		    room.addComponent(c);
		    var c = componentService.getComponentById(13002); //Rauchmelder
		    room.addComponent(c);
		    var c = componentService.getComponentById(8002); //Fensterkontakt
			c.setName("Fenster");
		    var c = componentService.getComponentById(8004); //Beschattung
			c.setName("Fenster");
		    room.addComponent(c);
		    var c = componentService.getComponentById(5001); //Stromverbraucher
			c.setName("Fön");
		    room.addComponent(c);
		    var c = componentService.getComponentById(5001); //Stromverbraucher
			c.setName("Waschmaschine");
		    room.addComponent(c);
		    var c = componentService.getComponentById(5001); //Stromverbraucher
			c.setName("Wäschetrockner");
		    room.addComponent(c);
		    var c = componentService.getComponentById(5002); //Wasserverbraucher
			c.setName("Badewanne");
		    room.addComponent(c);
		    var c = componentService.getComponentById(5002); //Wasserverbraucher
			c.setName("Dusche");
		    room.addComponent(c);
		    var c = componentService.getComponentById(5002); //Wasserverbraucher
			c.setName("Waschbecken links");
		    room.addComponent(c);
		    var c = componentService.getComponentById(5002); //Wasserverbraucher
			c.setName("Waschbecken rechts");
		    room.addComponent(c);
		    var c = componentService.getComponentById(5002); //Wasserverbraucher
			c.setName("Waschmaschine");
		    room.addComponent(c);
		    var c = componentService.getComponentById(7004); //Licht Komplett
			c.setName("Hauptlicht");
		    room.addComponent(c);
		    var c = componentService.getComponentById(7002); //Licht dimmer
			c.setName("Baspiegel Links");
		    room.addComponent(c);
		    var c = componentService.getComponentById(7002); //Licht dimmer
			c.setName("Baspiegel Rechts");
		    room.addComponent(c);
		    var c = componentService.getComponentById(2001); //Badewanne
		    room.addComponent(c);
		    var c = componentService.getComponentById(1001); //Waschmaschine
		    room.addComponent(c);
		    var c = componentService.getComponentById(1006); //Wäschetrockner
		    room.addComponent(c);
		floor.addRoom(room);
		// </editor-fold>
		// <editor-fold defaultstate="collapsed" desc="Garten">
		var room = new Mod_Room();
		    room.setId($rootScope.nextRoomId++);
		    room.setName("Badezimmer EG");
		    room.setFloor(floor);
		    var c = componentService.getComponentById(11001); //MutiRoomaudio
		    room.addComponent(c);
		    var c = componentService.getComponentById(12001); //Heizung
		    room.addComponent(c);
		    var c = componentService.getComponentById(5001); //Stromrverbraucher
			c.setName("Pool");
		    room.addComponent(c);
		    var c = componentService.getComponentById(5001); //Stromrverbraucher
			c.setName("Rasenroboter");
		    room.addComponent(c);
		    var c = componentService.getComponentById(5002); //Wasserverbraucher
			c.setName("Sprenkelanlage");
		    room.addComponent(c);
		    var c = componentService.getComponentById(5002); //Wasserverbraucher
			c.setName("Pool");
		    room.addComponent(c);
		    var c = componentService.getComponentById(7001); //Licht normal
			c.setName("Garten");
		    room.addComponent(c);
		    var c = componentService.getComponentById(7004); //Licht Komplett
			c.setName("Terrasse");
		    room.addComponent(c);
		    var c = componentService.getComponentById(2002); //Pool
		    room.addComponent(c);
		    var c = componentService.getComponentById(1002); //Zisterne
		    room.addComponent(c);
		    var c = componentService.getComponentById(1003); //Sprenkelanlage
		    room.addComponent(c);
		    var c = componentService.getComponentById(1001); //Rasenroboter
		    room.addComponent(c);
		floor.addRoom(room);
		// </editor-fold>
		// <editor-fold defaultstate="collapsed" desc="Garage">
		var room = new Mod_Room();
		    room.setId($rootScope.nextRoomId++);
		    room.setName("Garage");
		    room.setFloor(floor);
		    var c = componentService.getComponentById(11001); //MutiRoomaudio
		    room.addComponent(c);
		    var c = componentService.getComponentById(12001); //Heizung
		    room.addComponent(c);
		    var c = componentService.getComponentById(13002); //Rauchmelder
		    room.addComponent(c);
		    var c = componentService.getComponentById(8002); //Fensterkontakt
			c.setName("Fenster Garten");
		    room.addComponent(c);
		    var c = componentService.getComponentById(8002); //Fensterkontakt
			c.setName("Fenster Links");
		    var c = componentService.getComponentById(8004); //Beschattung
			c.setName("Fenster Garten");
		    room.addComponent(c);
		    var c = componentService.getComponentById(8004); //Beschattung
			c.setName("Fenster Links");
		    room.addComponent(c);
		    var c = componentService.getComponentById(5001); //Stromverbraucher
			c.setName("Ladegerät");
		    room.addComponent(c);
		    var c = componentService.getComponentById(5001); //Stromverbraucher
			c.setName("Lötstation");
		    room.addComponent(c);
		    var c = componentService.getComponentById(5001); //Stromverbraucher
			c.setName("Kompressor");
		    room.addComponent(c);
		    var c = componentService.getComponentById(5002); //Wasserverbraucher
			c.setName("Waschbecken");
		    room.addComponent(c);
		    var c = componentService.getComponentById(7001); //Licht normal
			c.setName("Hauptlicht");
		    room.addComponent(c);
		    var c = componentService.getComponentById(7002); //Licht dimmer
			c.setName("Werkstattlicht");
		    room.addComponent(c);
		    var c = componentService.getComponentById(8001); //Garagentor
		    room.addComponent(c);
		floor.addRoom(room);
		// </editor-fold>
		// <editor-fold defaultstate="collapsed" desc="Sauna">
		var room = new Mod_Room();
		    room.setId($rootScope.nextRoomId++);
		    room.setName("Sauna");
		    room.setFloor(floor);
		    var c = componentService.getComponentById(2003); //Sauna
		    room.addComponent(c);
		    var c = componentService.getComponentById(5001); //Stromverbraucher
			c.setName("Sauna");
		    room.addComponent(c);
		     var c = componentService.getComponentById(7004); //Licht Komplett
			c.setName("Hauptlicht");
		    room.addComponent(c);
		floor.addRoom(room);
		// </editor-fold>
	    home.addFloor(floor);
	    //Erdgeschoss
	    var floor = new Mod_Floor();
		floor.setId($rootScope.nextFloorId++);
		floor.setName("Obergeschoss");
		floor.setDescription("Desc: H0-F1");
		floor.setHouse(home);
		// <editor-fold defaultstate="collapsed" desc="Kinderzimmer Max">
		var room = new Mod_Room();
		    room.setId($rootScope.nextRoomId++);
		    room.setName("Kinderzimmer Max");
		    room.setFloor(floor);
		    var c = componentService.getComponentById(11001); //MutiRoomaudio
		    room.addComponent(c);
		    var c = componentService.getComponentById(12001); //Heizung
		    room.addComponent(c);
		    var c = componentService.getComponentById(13002); //Rauchmelder
		    room.addComponent(c);
		    var c = componentService.getComponentById(8002); //Fensterkontakt
			c.setName("Fenster Groß");
		    room.addComponent(c);
		    var c = componentService.getComponentById(8002); //Fensterkontakt
			c.setName("Fenster Klein");
		    var c = componentService.getComponentById(8004); //Beschattung
			c.setName("Fenster Groß");
		    room.addComponent(c);
		    var c = componentService.getComponentById(8004); //Beschattung
			c.setName("Fenster Klein");
		    room.addComponent(c);
		    var c = componentService.getComponentById(5001); //Stromverbraucher
			c.setName("TV");
		    room.addComponent(c);
		    var c = componentService.getComponentById(5001); //Stromverbraucher
			c.setName("PlayStation");
		    room.addComponent(c);
		    var c = componentService.getComponentById(5001); //Stromverbraucher
			c.setName("Ladegerät");
		    room.addComponent(c);
		    var c = componentService.getComponentById(7004); //Lciht Komplett
			c.setName("Hauptlicht");
		    room.addComponent(c);
		    var c = componentService.getComponentById(7002); //Lciht dimmer
			c.setName("Leselampe");
		    room.addComponent(c);
		    var c = componentService.getComponentById(4002); //TV
		    room.addComponent(c);
		floor.addRoom(room);
		// </editor-fold>
		// <editor-fold defaultstate="collapsed" desc="Kinderzimmer Anna">
		var room = new Mod_Room();
		    room.setId($rootScope.nextRoomId++);
		    room.setName("Kinderzimmer Anna");
		    room.setFloor(floor);
		    var c = componentService.getComponentById(11001); //MutiRoomaudio
		    room.addComponent(c);
		    var c = componentService.getComponentById(12001); //Heizung
		    room.addComponent(c);
		    var c = componentService.getComponentById(13002); //Rauchmelder
		    room.addComponent(c);
		    var c = componentService.getComponentById(8002); //Fensterkontakt
			c.setName("Fenster Groß");
		    room.addComponent(c);
		    var c = componentService.getComponentById(8002); //Fensterkontakt
			c.setName("Fenster Klein");
		    var c = componentService.getComponentById(8004); //Beschattung
			c.setName("Fenster Groß");
		    room.addComponent(c);
		    var c = componentService.getComponentById(8004); //Beschattung
			c.setName("Fenster Klein");
		    room.addComponent(c);
		    var c = componentService.getComponentById(5001); //Stromverbraucher
			c.setName("TV");
		    room.addComponent(c);
		    var c = componentService.getComponentById(5001); //Stromverbraucher
			c.setName("WiiU");
		    room.addComponent(c);
		    var c = componentService.getComponentById(5001); //Stromverbraucher
			c.setName("Ladegerät");
		    room.addComponent(c);
		    var c = componentService.getComponentById(7004); //Lciht Komplett
			c.setName("Hauptlicht");
		    room.addComponent(c);
		    var c = componentService.getComponentById(7002); //Lciht dimmer
			c.setName("Leselampe");
		    room.addComponent(c);
		    var c = componentService.getComponentById(4002); //TV
		    room.addComponent(c);
		floor.addRoom(room);
		// </editor-fold>
		// <editor-fold defaultstate="collapsed" desc="Elternschlafzimmer">
		var room = new Mod_Room();
		    room.setId($rootScope.nextRoomId++);
		    room.setName("Elternschlafzimmer");
		    room.setFloor(floor);
		    var c = componentService.getComponentById(11001); //MutiRoomaudio
		    room.addComponent(c);
		    var c = componentService.getComponentById(12001); //Heizung
		    room.addComponent(c);
		    var c = componentService.getComponentById(13002); //Rauchmelder
		    room.addComponent(c);
		    var c = componentService.getComponentById(8002); //Fensterkontakt
			c.setName("Balkontür");
		    room.addComponent(c);
		    var c = componentService.getComponentById(8002); //Fensterkontakt
			c.setName("Balkonfenster");
		    room.addComponent(c);
		    var c = componentService.getComponentById(8002); //Fensterkontakt
			c.setName("Straßenfenster");
		    var c = componentService.getComponentById(8004); //Beschattung
			c.setName("Balkontür");
		    room.addComponent(c);
		    var c = componentService.getComponentById(8004); //Beschattung
			c.setName("Balkonfenster");
		    room.addComponent(c);
		    var c = componentService.getComponentById(8004); //Beschattung
			c.setName("Straßenfenster");
		    room.addComponent(c);
		    var c = componentService.getComponentById(5001); //Stromverbraucher
			c.setName("TV");
		    room.addComponent(c);
		    var c = componentService.getComponentById(5001); //Stromverbraucher
			c.setName("Ladegerät");
		    room.addComponent(c);
		    var c = componentService.getComponentById(7004); //Lciht Komplett
			c.setName("Hauptlicht");
		    room.addComponent(c);
		    var c = componentService.getComponentById(7002); //Lciht dimmer
			c.setName("Leselampe");
		    room.addComponent(c);
		    var c = componentService.getComponentById(7003); //Lciht Effekt
			c.setName("Balkon");
		    room.addComponent(c);
		    var c = componentService.getComponentById(4002); //TV
		    room.addComponent(c);
		floor.addRoom(room);
		// </editor-fold>
		// <editor-fold defaultstate="collapsed" desc="Badezimmer OG">
		var room = new Mod_Room();
		    room.setId($rootScope.nextRoomId++);
		    room.setName("Badezimmer OG");
		    room.setFloor(floor);
		    var c = componentService.getComponentById(11001); //MutiRoomaudio
		    room.addComponent(c);
		    var c = componentService.getComponentById(12001); //Heizung
		    room.addComponent(c);
		    var c = componentService.getComponentById(13002); //Rauchmelder
		    room.addComponent(c);
		    var c = componentService.getComponentById(8002); //Fensterkontakt
			c.setName("Fenster");
		    var c = componentService.getComponentById(8004); //Beschattung
			c.setName("Fenster");
		    room.addComponent(c);
		    var c = componentService.getComponentById(5001); //Stromverbraucher
			c.setName("Fön");
		    room.addComponent(c);
		    var c = componentService.getComponentById(5002); //Wasserverbraucher
			c.setName("Badewanne");
		    room.addComponent(c);
		    var c = componentService.getComponentById(5002); //Wasserverbraucher
			c.setName("Waschbecken links");
		    room.addComponent(c);
		    var c = componentService.getComponentById(5002); //Wasserverbraucher
			c.setName("Waschbecken rechts");
		    room.addComponent(c);
		    var c = componentService.getComponentById(7004); //Lciht Komplett
			c.setName("Hauptlicht");
		    room.addComponent(c);
		    var c = componentService.getComponentById(7002); //Lciht dimmer
			c.setName("Badspiegel Links");
		    room.addComponent(c);
		    var c = componentService.getComponentById(7002); //Lciht dimmer
			c.setName("Badspiegel Rechts");
		    room.addComponent(c);
		    var c = componentService.getComponentById(2001); //Badewanne
		    room.addComponent(c);
		floor.addRoom(room);
		// </editor-fold>
	    home.addFloor(floor);
	    // <editor-fold defaultstate="collapsed" desc="Haus Komponenten">
	    var c = componentService.getComponentById(8003); //Haustür
	    home.addComponent(c);
	    var c = componentService.getComponentById(13001); //Alarmanlage
	    home.addComponent(c);
	    var c = componentService.getComponentById(3001); //PV Anlage
	    home.addComponent(c);
	    var c = componentService.getComponentById(7001); //Licht normal
		c.setName("Außenbeleichtung");
	    home.addComponent(c);
	    var c = componentService.getComponentById(10001); //Bewegunsmelder innen
		c.setName("Flur EG");
	    home.addComponent(c);
	    var c = componentService.getComponentById(10001); //Bewegunsmelder innen
		c.setName("Flur OG");
	    home.addComponent(c);
	    var c = componentService.getComponentById(10002); //Bewegunsmelder außen
		c.setName("Vorne");
	    home.addComponent(c);
	    var c = componentService.getComponentById(10002); //Bewegunsmelder außen
		c.setName("Links");
	    home.addComponent(c);
	    var c = componentService.getComponentById(10002); //Bewegunsmelder außen
		c.setName("Hinten");
	    home.addComponent(c);
	    var c = componentService.getComponentById(10002); //Bewegunsmelder außen
		c.setName("Rechts");
	    home.addComponent(c);
	    var c = componentService.getComponentById(6001); //Thermometer
	    home.addComponent(c);
	    var c = componentService.getComponentById(6002); //Niederschlagsmesser
	    home.addComponent(c);
	    var c = componentService.getComponentById(6003); //Luftdruck
	    home.addComponent(c);
	    var c = componentService.getComponentById(6004); //Windgeschwindigkeit
	    home.addComponent(c);
	    var c = componentService.getComponentById(9002); //Außenkamera
		c.setName("Vorne");
	    home.addComponent(c);
	    var c = componentService.getComponentById(9002); //Außenkamera
		c.setName("Links");
	    home.addComponent(c);
	    var c = componentService.getComponentById(9002); //Außenkamera
		c.setName("Hinten");
	    home.addComponent(c);
	    var c = componentService.getComponentById(9002); //Außenkamera
		c.setName("Rechts");
	    home.addComponent(c);
	    var c = componentService.getComponentById(9001); //Innenkamera
		c.setName("Flur EG");
	    home.addComponent(c);
	    var c = componentService.getComponentById(9001); //Innenkamera
		c.setName("Flur OG");
	    home.addComponent(c);
	    // </editor-fold>
	    
	    console.info(JSON.stringify(home,null,2));
	    console.groupEnd();
	    return home;
    }
    
    function saveHouses(houses) {
	console.groupCollapsed("MainService::getHouses");
	console.groupCollapsed("House Array");
	console.info(JSON.stringify(houses,null,2));
	console.groupEnd();
	store(JSON.stringify(houses),"houses");
	console.groupEnd();
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