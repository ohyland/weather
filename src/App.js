import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
	const [weather, setWeather] = useState(null); // null -> false until the data is successfully fetched
	const [weatherInput, setWeatherInput] = useState(""); // null -> false until the data is successfully fetched

	useEffect(() => {
		axios
			.get(
				"https://api.weatherapi.com/v1/forecast.json?key=76cb3407f2014f49902211656202611&q=Dublin&days=7"
			)
			.then((data) => {
				setWeather(data.data);
				console.log(data.data.current);
			})
			.catch((err) => console.log(err));
	}, []);
	// Event
	const weatherInputHandler = (e) => {
		setWeatherInput(e.target.value);
	};

	const searchWeather = (e) => {
		axios
			.get(
				`https://api.weatherapi.com/v1/current.json?key=76cb3407f2014f49902211656202611&q=${weatherInput}&days=7`
			)
			.then((data) => {
				setWeather(data.data);
			});
	};

	return (
		<div className="App">
			{weather && (
				<div>
					<input onChange={weatherInputHandler} type="text" />
					<button onClick={searchWeather}>Submit</button>
					<h1>
						The Weather in {weather.location.region}
					</h1>
					<h1>{weather.location.country}</h1>
					<h2>
						The temperature is {weather.current.temp_c}
						&#176;c and it feels like {weather.current.feelslike_c}&#176;c
					</h2>
					<h2>
						The temperature is {weather.current.temp_f}
						&#176;f and it feels like {weather.current.feelslike_f}&#176;f
					</h2>
					<h2>
						Wind {weather.current.wind_mph}mph
					</h2>
					<h2>
						Wind {weather.current.wind_mph}mph. direction {weather.current.wind_dir}
					</h2>
					<h2>{weather.current.condition.text}</h2>
					<img src={weather.current.condition.icon} alt="current condition" />
					
					<h2>
						7 day forecast
					</h2>
					<h3>
						Date:{" "}{weather.forecast.forecastday[0].date}
						<br/>
						Average temperature:{" "}{weather.forecast.forecastday[0].day.avgtemp_c}&#176;c
						<br/>
						Average temperature:{" "}{weather.forecast.forecastday[0].day.avgtemp_f}&#176;f
						<br/>
						{weather.forecast.forecastday[0].day.condition.text}
						<br/>
						<img src={weather.forecast.forecastday[0].day.condition.icon} alt="current condition" />
						
						<br/>
						Sunrise{weather.forecast.forecastday[0].astro.sunrise}
						<br/>
						Sunset{weather.forecast.forecastday[0].astro.sunset}
					</h3>
				</div>
			)}
		</div>
	);
}

export default App;
