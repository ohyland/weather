import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
	const [weather, setWeather] = useState(null); // null -> false until the data is successfully fetched
	const [weatherInput, setWeatherInput] = useState(""); // null -> false until the data is successfully fetched

	useEffect(() => {
		axios
			.get(
				"https://api.weatherapi.com/v1/current.json?key=76cb3407f2014f49902211656202611&q=Dublin"
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
				`https://api.weatherapi.com/v1/current.json?key=76cb3407f2014f49902211656202611&q=${weatherInput}`
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
						The Weather in {weather.location.region}, {weather.location.country}
					</h1>
					<h2>
						The temperature is {weather.current.temp_c}
						&#176;c and it feels like {weather.current.feelslike_c}&#176;c
					</h2>
					<h2>{weather.current.condition.text}</h2>
					<img src={weather.current.condition.icon} alt="current condition" />
				</div>
			)}
		</div>
	);
}

export default App;
