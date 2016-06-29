/**
 * @author René Lottes
 */
'use strict';

app.service("ComponentService", ["Mod_Category","Mod_Component",
    function(Mod_Category,Mod_Component) {
    
    var id = 1000;
    var base_id = 1;
    
    var cats = [];
    
    var cat = new Mod_Category();
	cat.setId(getNextId());
	cat.setName("Garten");
	fillComponents(cat,["Rasenroboter","Zisterne","Sprenkelanlage"]);
	cats.push(cat);
	increaseId();
	
    var cat = new Mod_Category();
	cat.setId(getNextId());
	cat.setName("Haushaltsgeräte");
	fillComponents(cat,["Badewanne","Kaffeemaschine","Herd","Spülmaschine","Kühlschrank","Waschmaschine"]);
	cats.push(cat);
	increaseId();
	
    var cat = new Mod_Category();
	cat.setId(getNextId());
	cat.setName("Wellness");
	fillComponents(cat,["Sauna","Pool"]);
	cats.push(cat);
	increaseId();

    var cat = new Mod_Category();
	cat.setId(getNextId());
	cat.setName("Zentral");
	fillComponents(cat,["Photovoltaikanlage"]);
	cats.push(cat);
	increaseId();
	
    var cat = new Mod_Category();
	cat.setId(getNextId());
	cat.setName("Heimkino");
	fillComponents(cat,["Beamer","TV","Leinwand"]);
	cats.push(cat);
	increaseId();
	
    var cat = new Mod_Category();
	cat.setId(getNextId());
	cat.setName("Verbraucher");
	fillComponents(cat,["Energieverbraucher","Wasserverbraucher"]);
	cats.push(cat);
	increaseId();
	
    var cat = new Mod_Category();
	cat.setId(getNextId());
	cat.setName("Klima");
	fillComponents(cat,["Temperaturmesser","Niederschlagsmesser","Luftdruckmesser","Windgeschwindigkeitsmesser"]);
	cats.push(cat);
	increaseId();
	
    var cat = new Mod_Category();
	cat.setId(getNextId());
	cat.setName("Beleuchtung");
	fillComponents(cat,["Taster","Dimmer","Effektlicht"]);
	cats.push(cat);
	increaseId();
	
    var cat = new Mod_Category();
	cat.setId(getNextId());
	cat.setName("Fenster, Türen & Tore");
	fillComponents(cat,["Garagentor","Tür","Fenster"]);
	cats.push(cat);
	increaseId();
	
    var cat = new Mod_Category();
	cat.setId(getNextId());
	cat.setName("Kamera");
	fillComponents(cat,["Innenkamera","Außenkamera"]);
	cats.push(cat);
	increaseId();
	
    var cat = new Mod_Category();
	cat.setId(getNextId());
	cat.setName("Bewegunsmelder");
	fillComponents(cat,["Bewegunsmelder außen","Bewegunsmelder innen"]);
	cats.push(cat);
	increaseId();
	
    var cat = new Mod_Category();
	cat.setId(getNextId());
	cat.setName("Multi Room Audio");
	fillComponents(cat,["Multi Room Audio"]);
	cats.push(cat);
	increaseId();
	
    var cat = new Mod_Category();
	cat.setId(getNextId());
	cat.setName("Heizen");
	fillComponents(cat,["Innenthermostat","Heizkörperthermostat","Zentralheiung"]);
	cats.push(cat);
	increaseId();
	
    var cat = new Mod_Category();
	cat.setId(getNextId());
	cat.setName("Alarm");
	fillComponents(cat,["Alarmanlage"]);
	cats.push(cat);
	increaseId();
	
    var cat = new Mod_Category();
	cat.setId(getNextId());
	cat.setName("Melder");
	fillComponents(cat,["Rauchmelder"]);
	cats.push(cat);
	increaseId();


    function getCategorys() {
	return cats;
    }
    
    function getCategoryById(id) {
    }
    
    function getComponentsByCategory(id) {
    	for(var cat in cats) {
    	   if(cats[cat].getId() == id)
    		   return cats[cat].getComponents();
    	}
    	return [];
    }
    
    function getComponentById(id) {
	for(var cat in cats) {
	    for(var comp in cats[cat].getComponents()) {
		if(cats[cat].getComponents()[comp].getId() === id) {
		    return cats[cat].getComponents()[comp];
		}
	    }
	}
    }
    
    function fillComponents(cat,comp_arr) {
	for(var i in comp_arr) {
	    var comp = new Mod_Component();
	    comp.setId(getNextId());
	    comp.setName(comp_arr[i]);
	    //TODO: description / type / settings
	    comp.setCategory(cat);
	    cat.addComponent(comp);
	}
    }
    
    function getNextId() {
	return id++;
    }
    function increaseId() {
	//1xxx per cat
	//xYYY per comp
	id = base_id*1000;
	base_id++;
    }
    
    return {
	getCategorys:getCategorys,
	getCategoryById:getCategoryById,
	getComponentsByCategory:getComponentsByCategory,
	getComponentById:getComponentById
    };
}]);
