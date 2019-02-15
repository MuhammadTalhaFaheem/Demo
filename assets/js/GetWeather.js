var modal = document.getElementById('myModal');
var weatherDegree = "";
var index;
var weatherTemList = [];
var weatherTimeList = [];
let Validation = () => {
	let selectCity = document.getElementById("select-city").value;
	let searchCity = document.getElementById("search-text").value;
	if (selectCity == "Select" || selectCity == "" || selectCity == null) {
		alert("Please Select Search By..");
	}
	else if (searchCity == "" || searchCity == null) {
		alert("Please Enter City Name..");
	}
	else {
		GetWeatherData();
	}
}
let GetWeatherData = async () => {
	modal.style.display = "block";
	let selectCity = document.getElementById("select-city").value;
	let searchCity = document.getElementById("search-text").value;
	let key = "c73aa228bfba692462f96e89080aa39a";
	let url;
	weatherTemList = [];
	weatherTimeList = [];
	let tUnit;
	let tempMeasure;
	if (selectCity == "by-city") {

		url = "http://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&units=metric&appid=" + key;
	}
	/*  var weatherData = $.get(url, function(data){
			 console.log(weatherData);
	 }); */
	if (selectCity == "by-zipcode") {
		url = "http://api.openweathermap.org/data/2.5/forecast?zip=" + searchCity + ",pk&units=metric&appid=" + key;
	}
	try {
		const response = await fetch(url);
		const weatherData = await response.json();

		var date = new Date();
		date.getDay();
		var day = GetCurrentDay(date.getDay());

		var cr = currentDate();
		/* for(var i=0 ; i < weatherData.cnt; i++){ */
		if (index == null || index == "") {
			index = 0;
		}

		wDate = WeatherDateConversion(weatherData.list[index].dt_txt);

		if (weatherDegree == "f") {
			let temp = weatherData.list[index].main.temp;

			tempMeasure = Math.round(temp * 9 / 5 + 32);
		}
		else if (weatherDegree == "c" || weatherDegree == "") {
			tempMeasure = Math.round(weatherData.list[index].main.temp);
		}
		/* tempMeasure =  MyFahrenheit(weatherData.list[index].main.temp); */
		document.getElementById("city").innerHTML = weatherData.city.name;
		document.getElementById("day-time").innerHTML = day + " " + wDate[1];
		/* Math.floor(weatherData.list[index].main.temp) */
		document.getElementById("temperature").innerHTML = tempMeasure;
		document.getElementById("humidity").innerHTML = "Humidity: " + weatherData.list[index].main.humidity + "%";
		document.getElementById("atmosphere").innerHTML = weatherData.list[index].weather[0].main;
		document.getElementById("wind").innerHTML = "Wind: " + (weatherData.list[index].wind.speed * 3.6).toFixed(2) + " km/h";
		document.getElementById("main-image").innerHTML = "<img alt='"+ weatherData.list[index].weather[0].main +"' src='assets/images/" + weatherData.list[index].weather[0].main + ".png'>";

		/* } */
		GraphWeatherData(selectCity,searchCity);
		DaysWeatherReport();
	}
	catch (e) {
		alert("Error Please enter valid City or Zip code " + e);
		window.location = "index.html";
	}


}

function DayWeatherReport() {
	var wd = GetWeatherData();
}

function WeatherDateConversion(dateString) {
	/* dateString */
	var cdate = "";
	var cTime = "";
	var date = "2019-02-11 09:00:00";
	var cnvtDate = dateString.split(" ");
	return cnvtDate;
}

function currentDate() {
	var todayDate;
	var d = new Date();
	var dd = d.getDate();
	var mm = d.getMonth() + 1;
	var yyyy = d.getFullYear();
	if (mm >= 0 && mm <= 9) {
		todayDate = yyyy + "-0" + mm + "-" + dd;
	}
	else {
		todayDate = yyyy + "-" + mm + "-" + dd;
	}

	return todayDate;
}
function GetCurrentDay(currentDay) {
	/*  var d = new Date(); */
	var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

	return days[currentDay - 1];
}
//GetCurrentDay();
function celsiusToFahrenheit() {

	weatherType("f");
	/* return Math.round(temp* 9 / 5 + 32); */
}

function weatherType(temp) {
	if (temp == "c") {
		weatherDegree = temp;
		GetWeatherData();
	}
	else if (temp == "f") {
		weatherDegree = temp;
		GetWeatherData();

	}
}

function fahrenheitToCelsius() {
	weatherType("c");
}
let DaysWeatherReport = async () => {
	let selectCity = document.getElementById("select-city").value;
	let searchCity = document.getElementById("search-text").value;
	let key = "c73aa228bfba692462f96e89080aa39a";
	let url;
	let minTemperature;
	let maxTemperature;
	let htmlDiv = document.getElementById("weather-flex");


	if (selectCity == "by-city") {

		url = "http://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&units=metric&appid=" + key;
	}
	/*  var weatherData = $.get(url, function(data){
			 console.log(weatherData);
	 }); */
	if (selectCity == "by-zipcode") {
		url = "http://api.openweathermap.org/data/2.5/forecast?zip=" + searchCity + ",pk&units=metric&appid=" + key;
	}

	let response = await fetch(url);
	let weatherData = await response.json();

	var date = new Date();
	date.getDay();

	let day = GetCurrentDay(date.getDay()).substr(0, 3);

	if (weatherDegree == "f") {
		let tempMin = Math.floor(weatherData.list[0].main.temp_min);
		let tempMax = Math.floor(weatherData.list[0].main.temp_max);

		minTemperature = Math.round(tempMin * 9 / 5 + 32);
		maxTemperature = Math.round(tempMax * 9 / 5 + 32);
	}
	else if (weatherDegree == "c" || weatherDegree == "") {
		minTemperature = Math.floor(weatherData.list[0].main.temp_min);
		maxTemperature = Math.floor(weatherData.list[0].main.temp_max)
	}

	let weatherFlexHtml = "";
	weatherFlexHtml = `<div onclick='weatherChangeIndex(${0})' >
									<p> ${day} </p>
								<img class='multi-weather-image' alt='${weatherData.list[0].weather[0].main}' src='assets/images/${weatherData.list[0].weather[0].main}.png'>
								<p> ${minTemperature}° ${maxTemperature}°</p>
								</div>`;
	/*  document.getElementById("weather-flex").innerHTML = weatherFlexHtml; */


	for (let i = 0; i < weatherData.cnt; i++) {
		wDate = WeatherDateConversion(weatherData.list[i].dt_txt);
		let multiDay;
		if (weatherDegree == "f") {
			let tempMin = Math.floor(weatherData.list[i].main.temp_min);
			let tempMax = Math.floor(weatherData.list[i].main.temp_max);

			minTemperature = Math.round(tempMin * 9 / 5 + 32);
			maxTemperature = Math.round(tempMax * 9 / 5 + 32);
		}
		else if (weatherDegree == "c" || weatherDegree == "") {
			minTemperature = Math.floor(weatherData.list[i].main.temp_min);
			maxTemperature = Math.floor(weatherData.list[i].main.temp_max)
		}
		if (wDate[1] == "00:00:00") {
			multiDay = getDaysArray(wDate[0]);
			weatherFlexHtml += `<div onclick='weatherChangeIndex(${i})'> 
			<p>  ${(multiDay.substr(0, 3))}  </p> 
			<img class='multi-weather-image' alt='${weatherData.list[i].weather[0].main}' src='assets/images/${weatherData.list[i].weather[0].main}.png'> 
			<p>  ${minTemperature}° ${maxTemperature}°</p> 
			</div>`;
		}
	}
	htmlDiv.innerHTML = weatherFlexHtml;
}
function getDaysArray(fullDate) {
	let splitDate = fullDate.split("-");
	let year = splitDate[0];
	let month = splitDate[1];
	let daySet = splitDate[2];
	var numDaysInMonth, daysInWeek, daysIndex, index, i, l, daysArray;
	var date = new Date();
	numDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	daysIndex = { 'Sun': 0, 'Mon': 1, 'Tue': 2, 'Wed': 3, 'Thu': 4, 'Fri': 5, 'Sat': 6 };
	index = daysIndex[(new Date(year, month - 1, 1)).toString().split(' ')[0]];
	daysArray = [];

	for (i = 0, l = numDaysInMonth[month - 1]; i < l; i++) {
		daysArray.push(daysInWeek[index++]);
		if (index == 7) index = 0;
	}
	/* console.log(date.getDate()); */
	let myDay = daysArray[daySet - 1];

	return myDay;
}
function weatherChangeIndex(i) {
	console.log(i);
	index = i;
	GetWeatherData();
	return index;
}

let GraphWeatherData = async (selectCity,searchCity) => {
	let key = "c73aa228bfba692462f96e89080aa39a";
	let url;
	let breakTime;
	let tempMeasure;
	if (selectCity == "by-city") {

		url = "http://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&units=metric&appid=" + key;
	}
	/*  var weatherData = $.get(url, function(data){
			 console.log(weatherData);
	 }); */
	if (selectCity == "by-zipcode") {
		url = "http://api.openweathermap.org/data/2.5/forecast?zip=" + searchCity + ",pk&units=metric&appid=" + key;
	}
	
	if (index == null || index == "") {
		index = 0;
	}
	const response = await fetch(url);
	const weatherData = await response.json();
	for (let i = 0; i < weatherData.cnt; i++) {
		wDate = WeatherDateConversion(weatherData.list[i].dt_txt); WeatherDateConversion(weatherData.list[i].dt_txt);
		weatherIndexDate = WeatherDateConversion(weatherData.list[index].dt_txt);
		if (wDate[0] == weatherIndexDate[0]) {
			if (weatherDegree == "f") {
				let temp = weatherData.list[i].main.temp;
	
				tempMeasure = Math.round(temp * 9 / 5 + 32);
			}
			else if (weatherDegree == "c" || weatherDegree == "") {
				tempMeasure = Math.round(weatherData.list[i].main.temp);
			}
			console.log(tempMeasure);
			weatherTemList.push(tempMeasure);
			breakTime = wDate[1].split(":");
			weatherTimeList.push(breakTime[0]);
		}
	}

	WeatherGraph();
}

function WeatherGraph() {

	categories = weatherTimeList;
	data = weatherTemList;

	Highcharts.chart('container', {
		chart: {
			type: 'areaspline'
		},
		title: {
			text: null
		},
		legend: {
			layout: 'vertical',
			align: 'left',
			verticalAlign: 'top',
			x: 150,
			y: 100,
			floating: true,
			borderWidth: 1,
			backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#fff5cc'
		},
		xAxis: {
			categories,
			/* plotBands: [{ // visualize the weekend
				from: 4.5,
				to: 6.5,
				color: 'rgba(68, 170, 213, .2)'
			}] */
		},
		/* yAxis: {
			title: {
				text: 'Fruit units'
			}
		},
		tooltip: {
			shared: true,
			valueSuffix: ' units'
		},
		credits: {
			enabled: false
		},
		plotOptions: {
			areaspline: {
				fillOpacity: 0.5
			}
		}, */
		series: [{
			data,

		}]
	});
}


