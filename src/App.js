import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";

let theme = createTheme();
theme = responsiveFontSizes(theme);

function App() {
  const [weather, setWeather] = useState(null);
  const [weatherInput, setWeatherInput] = useState("");

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
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          margin: "7vw",
          padding: "5vw",
          border: "1px solid lightgrey",
        }}
        className="App"
      >
        {weather && (
          <div>
            <input onChange={weatherInputHandler} type="text" />
            <button onClick={searchWeather}>Submit</button>
            <Typography variant="h2">
              {weather.location.region}, {weather.location.country}
            </Typography>
            <Typography>Sun 6th March</Typography>
            <Typography>
              The temperature is {weather.current.temp_c}
              &#176;c and it feels like {weather.current.feelslike_c}&#176;c
            </Typography>
            <Typography>
              The temperature is {weather.current.temp_f}
              &#176;f and it feels like {weather.current.feelslike_f}&#176;f
            </Typography>
            <Typography>Wind {weather.current.wind_mph}mph</Typography>
            <Typography>
              Wind {weather.current.wind_mph}mph. direction{" "}
              {weather.current.wind_dir}
            </Typography>
            <Typography>{weather.current.condition.text}</Typography>
            <img src={weather.current.condition.icon} alt="current condition" />

            <Typography variant="h4">7 day forecast</Typography>
            <Typography>
              Date: {weather.forecast.forecastday[0].date}
              <br />
              Average temperature:{" "}
              {weather.forecast.forecastday[0].day.avgtemp_c}&#176;c
              <br />
              Average temperature:{" "}
              {weather.forecast.forecastday[0].day.avgtemp_f}&#176;f
              <br />
              {weather.forecast.forecastday[0].day.condition.text}
              <br />
              <img
                src={weather.forecast.forecastday[0].day.condition.icon}
                alt="current condition"
              />
              <br />
              Sunrise{weather.forecast.forecastday[0].astro.sunrise}
              <br />
              Sunset{weather.forecast.forecastday[0].astro.sunset}
            </Typography>
          </div>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
