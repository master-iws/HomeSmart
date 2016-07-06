'use strict';

app.controller('WeatherController',["$scope", "$rootScope", "$state",	function($scope, $rootScope, $state) {
	
	var windIcons=[];
	windIcons["W"]="towards-90-deg";
	windIcons["SW"]="towards-45-deg";
	windIcons["S"]="towards-0-deg";
	windIcons["SO"]="towards-313-deg";
	windIcons["O"]="towards-270-deg";
	windIcons["NO"]="towards-225-deg";
	windIcons["N"]="towards-180-deg";
	windIcons["NW"]="towards-135-deg";
	
	var weatherIcons=[];
	weatherIcons.push("wi-day-sunny");
	weatherIcons.push("wi-fog");
	weatherIcons.push("wi-rain-wind");
	weatherIcons.push("wi-day-cloudy");
	weatherIcons.push("wi-day-storm-showers");
	
	var weather = null;
	var wind = null;
	
	$scope.weather={};
	$scope.weather.current = {
	    icon:weatherIcons[getWeather()],
	    temperature:getTemp(getWeather()),
	    humidity:gethumidity(getWeather()),
	    rainchance:getRain(getWeather()),
	    sunrise:"6:23",
	    sunset:"21:47",
	    wind:{
		icon:windIcons[getWind()],
		dir:getWind(),
		speed:getSpeed(getWeather())
	    }
	};
	$scope.weather.today={};
	
	weather = null;
	wind = null;
	$scope.weather.today.early={
		icon:weatherIcons[getWeather()],
		temperature:getTemp(getWeather()),
		rainchance:getRain(getWeather()),
		wind:{
		    icon:windIcons[getWind()],
		    dir:getWind(),
		    speed:getSpeed(getWeather())
		}
	    };
	
	weather = null;
	wind = null;
	$scope.weather.today.lunchtime={
		icon:weatherIcons[getWeather()],
		temperature:getTemp(getWeather()),
		rainchance:getRain(getWeather()),
		wind:{
		    icon:windIcons[getWind()],
		    dir:getWind(),
		    speed:getSpeed(getWeather())
		}
	    };
	
	weather = null;
	wind = null;
	$scope.weather.today.evening={
		icon:weatherIcons[getWeather()],
		temperature:getTemp(getWeather()),
		rainchance:getRain(getWeather()),
		wind:{
		    icon:windIcons[getWind()],
		    dir:getWind(),
		    speed:getSpeed(getWeather())
		}
	    };
	    
	weather = null;
	wind = null;
	$scope.weather.tomorrow={
		icon:weatherIcons[getWeather()],
		temperature:getTemp(getWeather()),
		rainchance:getRain(getWeather()),
		sunrise:"6:25",
		sunset:"21:50",
		wind:{
		    icon:windIcons[getWind()],
		    dir:getWind(),
		    speed:getSpeed(getWeather())
		}
	    };
	    
	weather = null;
	wind = null;
	$scope.weather.tomorrow2={
		icon:weatherIcons[getWeather()],
		temperature:getTemp(getWeather()),
		rainchance:getRain(getWeather()),
		sunrise:"6:31",
		sunset:"21:53",
		wind:{
		    icon:windIcons[getWind()],
		    dir:getWind(),
		    speed:getSpeed(getWeather())
		}
	    };
	
	function getWeather() {
	    if (weather !== null){
		return weather;
	    }
	    weather = Math.floor(Math.random() * weatherIcons.length);
	    return weather;
	}
	
	function getWind() {
	    var w = ['W','SW','S','SO','O','NO','N','NW'];
	    if (wind !== null){
		return w[wind];
	    }
	    wind = Math.floor(Math.random() * w.length);
	    console.log(w[wind]);
	    return w[wind];
	}
	
	function getSpeed(w) {
	    switch(w){
		case 0:
		    return Math.floor(Math.random() * 20)+0;
		case 1:
		    return Math.floor(Math.random() * 25)+0;
		case 2:
		    return Math.floor(Math.random() * 20)+5;
		case 3:
		    return Math.floor(Math.random() * 15)+0;
		case 4:
		    return Math.floor(Math.random() * 10)+20;
	    }
	}
	
	function gethumidity(w) {
	    switch(w){
		case 0:
		    return Math.floor(Math.random() * 20)+20;
		case 1:
		    return Math.floor(Math.random() * 25)+30;
		case 2:
		    return Math.floor(Math.random() * 20)+20;
		case 3:
		    return Math.floor(Math.random() * 15)+20;
		case 4:
		    return Math.floor(Math.random() * 30)+20;
	    }
	}
	
	function getRain(w) {
	    switch(w){
		case 0:
		    return Math.floor(Math.random() * 15)+0;
		case 1:
		    return Math.floor(Math.random() * 20)+5;
		case 2:
		    return Math.floor(Math.random() * 50)+50;
		case 3:
		    return Math.floor(Math.random() * 25)+20;
		case 4:
		    return Math.floor(Math.random() * 50)+50;
	    }
	}
	
	function getTemp(w) {
	    switch(w){
		case 0:
		    return Math.floor(Math.random() * 15)+10;
		case 1:
		    return Math.floor(Math.random() * 10)+5;
		case 2:
		case 3:
		case 4:
		    return Math.floor(Math.random() * 15)+10;
	    }
	}

}]);