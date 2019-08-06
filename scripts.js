window.onload = function() {
	navigator.geolocation.getCurrentPosition(position => {
		var url = "https://api.openweathermap.org/data/2.5/weather?lat="+position.coords.latitude+"&lon="+position.coords.longitude+"&units=metric&lang=pt&APPID="+API_KEY_OPENWEATHER;
		getWeather(url);
	});
}

function getWeather(url) {	
	var ajax = new XMLHttpRequest();
	ajax.open("GET", url, true);
	ajax.send();
	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4 && ajax.status == 200) {		    
			var data = JSON.parse(ajax.response);
			console.log(data);
			getImage(data.weather[0].description);
			document.querySelector('#desc').innerText = data.weather[0].description;
			document.querySelector('#city').innerText = data.name;
			document.querySelector('#graus').innerText = data.main.temp+" °C";
		}
	}	
}	

function getImage(term) {
	var unsapi = "https://api.unsplash.com/photos/random/?client_id="+ACCESS_KEY_UNSPLASH+"&query="+term;
	var ajaxuns = new XMLHttpRequest();
	ajaxuns.open("GET", unsapi, true);
	ajaxuns.send();
	ajaxuns.onreadystatechange = function() {
		var datauns = JSON.parse(ajaxuns.response);
		document.querySelector('body').style.backgroundImage = "url("+datauns.urls.full+")";
	}
}