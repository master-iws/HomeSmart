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
	    var home_2 = getDemoHome();
	    home_2.setName("Landhaus");
	    house_arr.push(home_2);
	    console.log(home_2);
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
		    room.setIcon("data:image/png;base64,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");
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