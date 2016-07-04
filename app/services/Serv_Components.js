/**
 * @author René Lottes
 */
'use strict';

app.service("ComponentService", ["Mod_Category","Mod_Component",
    function(Mod_Category,Mod_Component) {
    console.groupCollapsed("Components");
    var id = 1000;
    var base_id = 1;
    
    var cats = [];
    
    var cat = new Mod_Category();
	cat.setId(getNextId());
	cat.setName("Garten");
	fillComponents(cat,[["Rasenroboter",6,[0,null,null]],
			    ["Zisterne",5,[0]],
			    ["Sprenkelanlage",7,[0,null,null]]]);
	cats.push(cat);
	increaseId();
	
    var cat = new Mod_Category();
	cat.setId(getNextId());
	cat.setName("Haushaltsgeräte");
	fillComponents(cat,[["Kaffeemaschine",8,[0]],
			    ["Herd",9,[0,null,0,0]],
			    ["Spülmaschine",10,[0,null,0]],
			    ["Kühlschrank",11,[0]],
			    ["Waschmaschine",12,[0,null,0]],
			    ["Wäschetrockner",13,[0,null,0]]]);
	cats.push(cat);
	increaseId();
	
    var cat = new Mod_Category();
	cat.setId(getNextId());
	cat.setName("Wellness");
	fillComponents(cat,[["Badewanne",14,[0,0,0,0]],
			    ["Pool",15,[0,0,0,0]],
			    ["Sauna",16,[0,0,0,0]]]);
	cats.push(cat);
	increaseId();

    var cat = new Mod_Category();
	cat.setId(getNextId());
	cat.setName("Zentral");
	fillComponents(cat,[["Photovoltaikanlage",17,[0]]]);
	cats.push(cat);
	increaseId();
	
    var cat = new Mod_Category();
	cat.setId(getNextId());
	cat.setName("Heimkino");
	fillComponents(cat,[["Beamer",19,[0,null]],
			    ["TV",18,[0,0,0]],
			    ["Leinwand",20,[0]]]);
	cats.push(cat);
	increaseId();
	
    var cat = new Mod_Category();
	cat.setId(getNextId());
	cat.setName("Verbraucher");
	fillComponents(cat,[["Stromverbraucher - aktiv",21,[0]],
			    ["Stromverbraucher - passiv",22,[0]],
			    ["Wasserverbraucher",23,[0]]]);
	cats.push(cat);
	increaseId();
	
    var cat = new Mod_Category();
	cat.setId(getNextId());
	cat.setName("Klima");
	fillComponents(cat,[["Termometer",24,[0,0]],
			    ["Niederschlagsmesser",25,[0,0]],
			    ["Luftdruck",26,[0,0]],
			    ["Windgeschwindigkeit",27,[0,0]]]);
	cats.push(cat);
	increaseId();
	
    var cat = new Mod_Category();
	cat.setId(getNextId());
	cat.setName("Beleuchtung");
	fillComponents(cat,[["Licht normal",1,[0]],
			    ["Licht dimmer",2,[0,0]],
			    ["Licht Effekt",3,[0,"#ff55bb"]],
			    ["Licht Komplett",4,[0,0]]]);
	cats.push(cat);
	increaseId();
	
    var cat = new Mod_Category();
	cat.setId(getNextId());
	cat.setName("Fenster, Türen & Tore");
	fillComponents(cat,[["Garagentor",35,[0]],
			    ["Fensterkontakt",36,null],
			    ["Haustür",37,[0,null]],
			    ["Beschattung",38,[0,null]]]);
	cats.push(cat);
	increaseId();
	
    var cat = new Mod_Category();
	cat.setId(getNextId());
	cat.setName("Kamera");
	fillComponents(cat,[["Innenkamera",28,null],
			    ["Außenkamera",29,null]]);
	cats.push(cat);
	increaseId();
	
    var cat = new Mod_Category();
	cat.setId(getNextId());
	cat.setName("Bewegunsmelder");
	fillComponents(cat,[["Bewegunsmelder innen",30,[0]],
			    ["Bewegunsmelder außen",31,[0]]]);
	cats.push(cat);
	increaseId();
	
    var cat = new Mod_Category();
	cat.setId(getNextId());
	cat.setName("Multi Room Audio");
	fillComponents(cat,[["Multi Room Audio",39,null]]);
	cats.push(cat);
	increaseId();
	
    var cat = new Mod_Category();
	cat.setId(getNextId());
	cat.setName("Heizung");
	fillComponents(cat,[["Heizung",32,[23,0,{start:0,end:0,times:[[{start: '10:00', end: '13:00', temp: '20'}],[],[],[],[],[],[]]},{start:0,end:0,times:[[],[],[],[],[],[],[]]}]]]);
	cats.push(cat);
	increaseId();
	
	var cat = new Mod_Category();
	cat.setId(getNextId());
	cat.setName("Sicherheit");
	fillComponents(cat,[["Alarmanlage",33,[0]],
			    ["Rauchmelder",34,[0,0]]]);
	cats.push(cat);
	increaseId();

    console.groupEnd();

    function getCategorys() {
	return cats;
    }
    
    function getCategoryById(id) {
	for(var cat in cats) {
	    for(var comp in cats[cat].getComponents()) {
		if(cats[cat].getComponents()[comp].getCategory().getId() === id) {
		    return cats[cat].getComponents()[comp].getCategory();
		}
	    }
	}
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
	    comp.setName(comp_arr[i][0]);
	    comp.setType(comp_arr[i][1]);
	    comp.setSettings(comp_arr[i][2]);
	    comp.setCategory(cat);
	    cat.addComponent(comp);
	    console.info(JSON.stringify(comp,null,2));
	}
    }
    
    function getNewComponentInstanceById(id) {
	return getComponentById(id).new();
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
	getComponentById:getComponentById,
	getNewComponentInstanceById:getNewComponentInstanceById
    };
}]);
