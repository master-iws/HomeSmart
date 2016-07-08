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
    	$rootScope.adminArea = false;
	console.groupCollapsed("MainService::getHouses");
	var stored = getStored("houses");
	var floorId=1;
	var house_arr=[];
	
	if(stored){
		
		$rootScope.loggedIn = true;
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
		$rootScope.loggedIn = false;
	    house_arr.push(getDemoHome());
	}
	console.groupCollapsed("House Array");
	console.info(JSON.parse(JSON.stringify(house_arr)));
	console.groupEnd();
	console.groupEnd();
	return house_arr;
    }
    
    function getDemoHome() {
	console.groupCollapsed("MainService::getDemoHome");
	$rootScope.nextHouseId = 0;
	$rootScope.nextFloorId = 0;
	$rootScope.nextRoomId = 0;
	$rootScope.nextComponentId = 0;
	
	var home = new Mod_House();
	    home.setId($rootScope.nextHouseId++);
	    home.setName("Home sweet home");
	    home.setDescription("This is our Home!");
	    home.setCity("10115 Berlin");
	    home.setZip("95119");
	    
	    //Dashboard
	    var dashboard = {};
	    dashboard.quicklinks = [];
	    dashboard.controls = [];
	    var quicklink = {};//auf rootScope setzen
		quicklink.category='Raum';
		quicklink.typ={};
		quicklink.typ.id = 0;
		quicklink.typ.name = "Küche";
		dashboard.quicklinks.push(quicklink);
	    var control = {roomId: 0,componentId: 10};
	    dashboard.controls.push(control);
	    home.setDashboard(dashboard);
	    
	    
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
		    var c = componentService.getNewComponentInstanceById(12001); //MutiRoomaudio
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(13001); //Heizung
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(14002); //Rauchmelder
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(9002); //Fensterkontakt
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Fenster Spüle");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(9002); //Fensterkontakt
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Fenster Garten");
		    var c = componentService.getNewComponentInstanceById(9004); //Beschattung
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Fenster Spüle");
			//c.setRoom(room);
		    room.addComponent(c);
		    
		    var c = componentService.getNewComponentInstanceById(9004); //Beschattung
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Fenster Garten");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(6001); //Stromverbraucher
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Mixer");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(6001); //Stromverbraucher
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Toaster");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(6001); //Stromverbraucher
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Thermomix");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(6001); //Stromverbraucher
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Wasserkocher");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(6002); //Stromverbraucher
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Kühlschrank");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(6002); //Stromverbraucher
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Spülmaschine");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(6002); //Stromverbraucher
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Kaffeemaschine");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(6002); //Stromverbraucher
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Ofen");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(6003); //Wasserverbraucher
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Spüle");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(6003); //Wasserverbraucher
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Spülmaschine");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(8001); //Licht normal
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Spüle");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(8001); //Licht normal
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Herd");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(8002); //Licht dimmer
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Hauptlicht");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(2004); //Kühlschrank
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(2003); //Spülmaschine
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(2001); //Kaffeemaschine
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(2002); //Herd
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		floor.addRoom(room);
		// </editor-fold>
		// <editor-fold defaultstate="collapsed" desc="Wohnzimmer">
		var room = new Mod_Room();
		    room.setId($rootScope.nextRoomId++);
		    room.setName("Wohnzimmer");
		    room.setFloor(floor);
		    var c = componentService.getNewComponentInstanceById(12001); //MutiRoomaudio
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(13001); //Heizung
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(14002); //Rauchmelder
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(9002); //Fensterkontakt
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Terassentür");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(9002); //Fensterkontakt
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Terassenfenster");
		    room.addComponent(c);
		     var c = componentService.getNewComponentInstanceById(9002); //Fensterkontakt
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Straßenfenster");
		    var c = componentService.getNewComponentInstanceById(9004); //Beschattung
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Terassentür");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(9004); //Beschattung
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Terassenfenster");
		    room.addComponent(c);
		     var c = componentService.getNewComponentInstanceById(9004); //Beschattung
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Straßenfenster");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(6002); //Stromverbraucher
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("TV");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(6002); //Stromverbraucher
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Beamer");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(6001); //Stromverbraucher
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Ladegerät");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(6001); //Stromverbraucher
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Zimmerbrunnen");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(8004); //Licht Komplett
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Hauptlicht");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(8002); //Licht dimmer
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Leselampe");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(5002); //TV
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(5001); //Beamer
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(5003); //Leinwand
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		floor.addRoom(room);
		// </editor-fold>
		// <editor-fold defaultstate="collapsed" desc="Badezimmer EG">
		var room = new Mod_Room();
		    room.setId($rootScope.nextRoomId++);
		    room.setName("Badezimmer EG");
		    room.setFloor(floor);
		    var c = componentService.getNewComponentInstanceById(12001); //MutiRoomaudio
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(13001); //Heizung
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(14002); //Rauchmelder
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(9002); //Fensterkontakt
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Fenster");
		    var c = componentService.getNewComponentInstanceById(9004); //Beschattung
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Fenster");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(6001); //Stromverbraucher
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Fön");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(6002); //Stromverbraucher
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Waschmaschine");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(6002); //Stromverbraucher
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Wäschetrockner");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(6003); //Wasserverbraucher
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Badewanne");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(6003); //Wasserverbraucher
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Dusche");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(6003); //Wasserverbraucher
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Waschbecken Links");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(6003); //Wasserverbraucher
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Waschbecken Rechts");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(6003); //Wasserverbraucher
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Waschmaschine");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(8004); //Licht Komplett
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Hauptlicht");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(8002); //Licht dimmer
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Baspiegel Links");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(8002); //Licht dimmer
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Baspiegel Rechts");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(3001); //Badewanne
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(2005); //Waschmaschine
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(2006); //Wäschetrockner
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		floor.addRoom(room);
		// </editor-fold>
		// <editor-fold defaultstate="collapsed" desc="Garten">
		var room = new Mod_Room();
		    room.setId($rootScope.nextRoomId++);
		    room.setName("Garten");
		    room.setFloor(floor);
		    var c = componentService.getNewComponentInstanceById(12001); //MutiRoomaudio
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(13001); //Heizung
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(6002); //Stromrverbraucher
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Pool");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(6002); //Stromrverbraucher
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Rasenroboter");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(6003); //Wasserverbraucher
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Sprenkelanlage");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(6003); //Wasserverbraucher
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Pool");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(8001); //Licht normal
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Garten");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(8004); //Licht Komplett
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Terrasse");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(3002); //Pool
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(1002); //Zisterne
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(1003); //Sprenkelanlage
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(1001); //Rasenroboter
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		floor.addRoom(room);
		// </editor-fold>
		// <editor-fold defaultstate="collapsed" desc="Garage">
		var room = new Mod_Room();
		    room.setId($rootScope.nextRoomId++);
		    room.setName("Garage");
		    room.setFloor(floor);
		    var c = componentService.getNewComponentInstanceById(12001); //MutiRoomaudio
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(13001); //Heizung
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(14002); //Rauchmelder
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(9002); //Fensterkontakt
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Fenster Garten");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(9002); //Fensterkontakt
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Fenster Links");
		    var c = componentService.getNewComponentInstanceById(9004); //Beschattung
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Fenster Garten");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(9004); //Beschattung
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Fenster Links");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(6001); //Stromverbraucher
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Ladegerät");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(6001); //Stromverbraucher
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Lötstation");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(6001); //Stromverbraucher
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Kompressor");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(6003); //Wasserverbraucher
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Waschbecken");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(8001); //Licht normal
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Hauptlicht");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(8002); //Licht dimmer
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Werkstattlicht");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(9001); //Garagentor
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		floor.addRoom(room);
		// </editor-fold>
		// <editor-fold defaultstate="collapsed" desc="Sauna">
		var room = new Mod_Room();
		    room.setId($rootScope.nextRoomId++);
		    room.setName("Sauna");
		    room.setFloor(floor);
		    var c = componentService.getNewComponentInstanceById(3003); //Sauna
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(6002); //Stromverbraucher
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Sauna");
		    room.addComponent(c);
		     var c = componentService.getNewComponentInstanceById(8004); //Licht Komplett
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
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
		    var c = componentService.getNewComponentInstanceById(12001); //MutiRoomaudio
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(13001); //Heizung
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(14002); //Rauchmelder
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(9002); //Fensterkontakt
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Fenster Groß");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(9002); //Fensterkontakt
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Fenster Klein");
		    var c = componentService.getNewComponentInstanceById(9004); //Beschattung
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Fenster Groß");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(9004); //Beschattung
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Fenster Klein");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(6002); //Stromverbraucher
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("TV");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(6001); //Stromverbraucher
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("PlayStation");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(6001); //Stromverbraucher
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Ladegerät");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(8004); //Licht Komplett
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Hauptlicht");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(8002); //Licht dimmer
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Leselampe");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(5002); //TV
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		floor.addRoom(room);
		// </editor-fold>
		// <editor-fold defaultstate="collapsed" desc="Kinderzimmer Anna">
		var room = new Mod_Room();
		    room.setId($rootScope.nextRoomId++);
		    room.setName("Kinderzimmer Anna");
		    room.setFloor(floor);
		    var c = componentService.getNewComponentInstanceById(12001); //MutiRoomaudio
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(13001); //Heizung
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(14002); //Rauchmelder
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(9002); //Fensterkontakt
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Fenster Groß");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(9002); //Fensterkontakt
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Fenster Klein");
		    var c = componentService.getNewComponentInstanceById(9004); //Beschattung
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Fenster Groß");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(9004); //Beschattung
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Fenster Klein");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(6002); //Stromverbraucher
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("TV");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(6001); //Stromverbraucher
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("WiiU");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(6001); //Stromverbraucher
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Ladegerät");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(8004); //Licht Komplett
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Hauptlicht");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(8002); //Licht dimmer
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Leselampe");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(5002); //TV
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		floor.addRoom(room);
		// </editor-fold>
		// <editor-fold defaultstate="collapsed" desc="Elternschlafzimmer">
		var room = new Mod_Room();
		    room.setId($rootScope.nextRoomId++);
		    room.setName("Elternschlafzimmer");
		    room.setFloor(floor);
		    var c = componentService.getNewComponentInstanceById(12001); //MutiRoomaudio
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(13001); //Heizung
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(14002); //Rauchmelder
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(9002); //Fensterkontakt
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Balkontür");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(9002); //Fensterkontakt
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Balkonfenster");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(9002); //Fensterkontakt
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Straßenfenster");
		    var c = componentService.getNewComponentInstanceById(9004); //Beschattung
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Balkontür");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(9004); //Beschattung
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Balkonfenster");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(9004); //Beschattung
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Straßenfenster");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(6002); //Stromverbraucher
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("TV");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(6001); //Stromverbraucher
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Ladegerät");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(8004); //Lciht Komplett
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Hauptlicht");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(8002); //Lciht dimmer
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Leselampe");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(8003); //Lciht Effekt
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Balkon");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(5002); //TV
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		floor.addRoom(room);
		// </editor-fold>
		// <editor-fold defaultstate="collapsed" desc="Badezimmer OG">
		var room = new Mod_Room();
		    room.setId($rootScope.nextRoomId++);
		    room.setName("Badezimmer OG");
		    room.setFloor(floor);
		    var c = componentService.getNewComponentInstanceById(12001); //MutiRoomaudio
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(13001); //Heizung
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(14002); //Rauchmelder
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(9002); //Fensterkontakt
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Fenster");
		    var c = componentService.getNewComponentInstanceById(9004); //Beschattung
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Fenster");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(6001); //Stromverbraucher
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Fön");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(6003); //Wasserverbraucher
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Badewanne");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(6003); //Wasserverbraucher
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Waschbecken Links");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(6003); //Wasserverbraucher
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Waschbecken Rechts");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(8004); //Lciht Komplett
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Hauptlicht");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(8002); //Lciht dimmer
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Badspiegel Links");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(8002); //Lciht dimmer
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
			c.setName("Badspiegel Rechts");
		    room.addComponent(c);
		    var c = componentService.getNewComponentInstanceById(3001); //Badewanne
			c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		    room.addComponent(c);
		floor.addRoom(room);
		// </editor-fold>
	    home.addFloor(floor);
	    // <editor-fold defaultstate="collapsed" desc="Haus Komponenten">
	    var c = componentService.getNewComponentInstanceById(9003); //Haustür
		c.setId($rootScope.nextComponentId++);c.setSerialId("123");
	    home.addComponent(c);
	    var c = componentService.getNewComponentInstanceById(14001); //Alarmanlage
		c.setId($rootScope.nextComponentId++);c.setSerialId("123");
	    home.addComponent(c);
	    var c = componentService.getNewComponentInstanceById(4001); //PV Anlage
		c.setId($rootScope.nextComponentId++);c.setSerialId("123");
	    home.addComponent(c);
	    var c = componentService.getNewComponentInstanceById(8001); //Licht normal
		c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		c.setName("Außenbeleuchtung");
	    home.addComponent(c);
	    var c = componentService.getNewComponentInstanceById(11001); //Bewegunsmelder innen
		c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		c.setName("Flur EG");
	    home.addComponent(c);
	    var c = componentService.getNewComponentInstanceById(11001); //Bewegunsmelder innen
		c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		c.setName("Flur OG");
	    home.addComponent(c);
	    var c = componentService.getNewComponentInstanceById(11002); //Bewegunsmelder außen
		c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		c.setName("Vorne");
	    home.addComponent(c);
	    var c = componentService.getNewComponentInstanceById(11002); //Bewegunsmelder außen
		c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		c.setName("Links");
	    home.addComponent(c);
	    var c = componentService.getNewComponentInstanceById(11002); //Bewegunsmelder außen
		c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		c.setName("Hinten");
	    home.addComponent(c);
	    var c = componentService.getNewComponentInstanceById(11002); //Bewegunsmelder außen
		c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		c.setName("Rechts");
	    home.addComponent(c);
	    var c = componentService.getNewComponentInstanceById(7001); //Thermometer
		c.setId($rootScope.nextComponentId++);c.setSerialId("123");
	    home.addComponent(c);
	    var c = componentService.getNewComponentInstanceById(7002); //Niederschlagsmesser
		c.setId($rootScope.nextComponentId++);c.setSerialId("123");
	    home.addComponent(c);
	    var c = componentService.getNewComponentInstanceById(7003); //Luftdruck
		c.setId($rootScope.nextComponentId++);c.setSerialId("123");
	    home.addComponent(c);
	    var c = componentService.getNewComponentInstanceById(7004); //Windgeschwindigkeit
		c.setId($rootScope.nextComponentId++);c.setSerialId("123");
	    home.addComponent(c);
	    var c = componentService.getNewComponentInstanceById(10002); //Außenkamera
		c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		c.setName("Vorne");
	    home.addComponent(c);
	    var c = componentService.getNewComponentInstanceById(10002); //Außenkamera
		c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		c.setName("Links");
	    home.addComponent(c);
	    var c = componentService.getNewComponentInstanceById(10002); //Außenkamera
		c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		c.setName("Hinten");
	    home.addComponent(c);
	    var c = componentService.getNewComponentInstanceById(10002); //Außenkamera
		c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		c.setName("Rechts");
	    home.addComponent(c);
	    var c = componentService.getNewComponentInstanceById(10001); //Innenkamera
		c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		c.setName("Flur EG");
	    home.addComponent(c);
	    var c = componentService.getNewComponentInstanceById(10001); //Innenkamera
		c.setId($rootScope.nextComponentId++);c.setSerialId("123");
		c.setName("Flur OG");
	    home.addComponent(c);
	    // </editor-fold>
	    
	    console.info(JSON.stringify(home,null,2));
	    console.groupEnd();
	    return home;
    }
    
    function saveHouses(houses) {
	if (!angular.isDefined(houses)) {
	    houses = $rootScope.houses;
	}
	if(angular.isDefined(houses)) {
	    console.groupCollapsed("MainService::saveHouses");
	    console.groupCollapsed("House Array");
	    console.info(JSON.stringify(houses,null,2));
	    console.groupEnd();
	    store(JSON.stringify(houses),"houses");
	    console.groupEnd();
	}
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