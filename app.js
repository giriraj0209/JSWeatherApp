var APPID = "#";
var temp;
var loc;
var icon;
var humidity;
var wind;
var direction;

function updateByZip(zip){
var url = "http://api.openweathermap.org/data/2.5/weather?"+
	"zip="+ zip +
	",us&APPID="+ APPID;
	sendRequest(url);

}
//Ajax call 
function sendRequest(url){
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange =function(){
if(xmlhttp.readyState ==4 && xmlhttp.status ==200){
var data =JSON.parse(xmlhttp.responseText);
var weather ={};
weather.icon =data.weather[0].id;
weather.humidity = data.main.humidity;
weather.wind =data.wind.speed;
weather.direction =degreesToDirection(data.wind.deg);
weather.loc =data.name;
weather.temp =K2C(data.main.temp);
update(weather);
}
};
xmlhttp.open("GET", url, true);
xmlhttp.send();
}
function K2C(k){
return Math.round(k-273.15);
}
function degreesToDirection(d){
var range =360/16;
var low =360 - range/2;
var high = (low +range)%360;
var angles = ["N", "NNE", "ENE", "E", "ESE", "SE", "SSE", "S","SSW","SW","WSW","W", "WNW", "NW","NNW"];

for (i in angles){
if(d >= low && d <high){
return angles[i];
}
low = (low + range) % 360;
high = (high + range) % 360;
}
return "M";
}
function update(weather){
wind.innerHTML =weather.wind;
direction.innerHTML=weather.direction;
humidity.innerHTML=weather.humidity;
loc.innerHTML=weather.loc;
temp.innerHTML=weather.temp;
icon.src = "imgs/codes/"+weather.icon+".png";	
	
}
function showPosition(position){
updateByGeo(position.coords.latitude, position.coords.longitude);
}
function updateByGeo(latitude, longitude){
var url = "http://api.openweathermap.org/data/2.5/weather?"+
	"lat="+ latitude +
	"&lon="+ longitude +
	"&APPID="+ APPID;
	sendRequest(url);
}
window.onload =function(){
	temp = document.getElementById("temperature");
	loc = document.getElementById("location");
	icon = document.getElementById("icon");
	humidity = document.getElementById("humidity");
	wind = document.getElementById("wind");
	direction = document.getElementById("direction");
	
	/*var weather ={};
	weather.wind = 3.5;
	weather.direction="N";
	weather.humidity=35;
	weather.loc ="Boston";
	weather.temp="45";
	weather.icon =200;
	
	update(weather); 
	updateByZip(36117);*/
	if(navigator.geolocation){
	navigator.geolocation.getCurrentPosition(showPosition);
	}else{
	var zip = window.prompt("Couldnot discover location, provide your zip");
	updateByZip(zip);
	}
}