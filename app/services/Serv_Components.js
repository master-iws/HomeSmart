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
	fillComponents(cat,[["Rasenroboter",6,[1,"2016-07-05T06:00:16.567Z","2016-07-05T16:00:16.567Z"]],
			    ["Zisterne",5,[3]],
			    ["Sprenkelanlage",7,[1,"2016-07-05T16:00:16.567Z","2016-07-05T18:00:16.567Z"]]]);
	cats.push(cat);
	increaseId();
	
    var cat = new Mod_Category();
	cat.setId(getNextId());
	cat.setName("Haushaltsgeräte");
	fillComponents(cat,[["Kaffeemaschine",8,[1,2,4]],
			    ["Herd",9,[1,3,200,40,20]],
			    ["Spülmaschine",10,[1,2,40]],
			    ["Kühlschrank",11,[8]],
			    ["Waschmaschine",12,[1,1,60,30]],
			    ["Wäschetrockner",13,[1,1,35]]]);
	cats.push(cat);
	increaseId();
	
    var cat = new Mod_Category();
	cat.setId(getNextId());
	cat.setName("Wellness");
	fillComponents(cat,[["Badewanne",14,[1,20,35,1]],
			    ["Pool",15,[1,20,28,10,0]],
			    ["Sauna",16,[1,20,60,40,80]]]);
	cats.push(cat);
	increaseId();

    var cat = new Mod_Category();
	cat.setId(getNextId());
	cat.setName("Zentral");
	fillComponents(cat,[["Photovoltaikanlage",17,[8]]]);
	cats.push(cat);
	increaseId();
	
    var cat = new Mod_Category();
	cat.setId(getNextId());
	cat.setName("Heimkino");
	fillComponents(cat,[["Beamer",19,[1,1]],
			    ["TV",18,[1,20,3]],
			    ["Leinwand",20,[5]]]);
	cats.push(cat);
	increaseId();
	
    var cat = new Mod_Category();
	cat.setId(getNextId());
	cat.setName("Verbraucher");
	fillComponents(cat,[["Stromverbraucher - aktiv",21,[1,"0,5"]],
			    ["Stromverbraucher - passiv",22,["0,5"]],
			    ["Wasserverbraucher",23,[2]]]);
	cats.push(cat);
	increaseId();
	
    var cat = new Mod_Category();
	cat.setId(getNextId());
	cat.setName("Klima");
	fillComponents(cat,[["Termometer",24,[1,24]],
			    ["Niederschlagsmesser",25,[1,"0,5"]],
			    ["Luftdruck",26,[1,1]],
			    ["Windgeschwindigkeit",27,[1,22]]]);
	cats.push(cat);
	increaseId();
	
    var cat = new Mod_Category();
	cat.setId(getNextId());
	cat.setName("Beleuchtung");
	fillComponents(cat,[["Licht normal",1,[1]],
			    ["Licht dimmer",2,[1,30]],
			    ["Licht Effekt",3,[1,"#ff55bb"]],
			    ["Licht Komplett",4,[1,60,"#ff55bb"]]]);
	cats.push(cat);
	increaseId();
	
    var cat = new Mod_Category();
	cat.setId(getNextId());
	cat.setName("Fenster, Türen & Tore");
	fillComponents(cat,[["Garagentor",35,[4]],
			    ["Fensterkontakt",36,[1]],
			    ["Haustür",37,[0,"18:34 Uhr -- Anna"]],
			    ["Beschattung",38,[5]]]);
	cats.push(cat);
	increaseId();
	
    var cat = new Mod_Category();
	cat.setId(getNextId());
	cat.setName("Kamera");
	fillComponents(cat,[["Innenkamera",28,[1]],
			    ["Außenkamera",29,[1]]]);
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
	fillComponents(cat,[["Multi Room Audio",39,[1,1,1,1,2,30,20]]]);
	cats.push(cat);
	increaseId();
	
    var cat = new Mod_Category();
	cat.setId(getNextId());
	cat.setName("Heizung");
	fillComponents(cat,[["Heizung",32,[23,0,{start:0,end:3,times:[[{start: '10:00', end: '13:00', temp: '20'}],[],[],[],[],[],[]]},{start:4,end:12,times:[[],[],[],[],[],[],[]]}]]]);
	cats.push(cat);
	increaseId();
	
	var cat = new Mod_Category();
	cat.setId(getNextId());
	cat.setName("Sicherheit");
	fillComponents(cat,[["Alarmanlage",33,[0]],
			    ["Rauchmelder",34,[1,2]]]);
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
		if(cats[cat].getComponents()[comp].getComponentId() === id) {
		    return cats[cat].getComponents()[comp];
		}
	    }
	}
    }
    
    function getComponentByType(type) {
    	for(var cat in cats) {
    	    for(var comp in cats[cat].getComponents()) {
    		if(cats[cat].getComponents()[comp].getType() === type) {
    		    return cats[cat].getComponents()[comp].new();
    		}
    	    }
    	}
        }
    
    function fillComponents(cat,comp_arr) {
	for(var i in comp_arr) {
	    var comp = new Mod_Component();
	    comp.setComponentId(getNextId());
	    comp.setId(-1);
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
	base_id++;
	id = base_id*1000;
    }
    
    return {
	getCategorys:getCategorys,
	getCategoryById:getCategoryById,
	getComponentsByCategory:getComponentsByCategory,
	getComponentById:getComponentById,
	getNewComponentInstanceByType:getComponentByType,
	getNewComponentInstanceById:getNewComponentInstanceById
    };
}]);
