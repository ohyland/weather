import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [weather, setWeather] = useState([]);
  
	useEffect(() => {
		axios
			.get(
				"http://api.weatherapi.com/v1/current.json?key=76cb3407f2014f49902211656202611&q=Dublin"
			)
			.then((data) => {
				setWeather(data.data);
				console.log(data.data);
			})
			.catch((err) => console.log(err));
	}, []);
	return (
		<div className="App">
			<h1>Check the Weather in {weather.location.country}</h1>
		</div>
	);
}

export default App;
