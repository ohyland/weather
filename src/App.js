import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";
import SearchBar from "./components/SearchBar";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Box,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      "& .MuiGrid-container": {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-around",
        padding: "15px",
        textAlign: "right",
      },
    },
  })
);

function App() {
  const [weather, setWeather] = useState(null);
  const [weatherInput, setWeatherInput] = useState("");
  const classes = useStyles();

  useEffect(() => {
    axios
      .get(
        "https://api.weatherapi.com/v1/forecast.json?key=76cb3407f2014f49902211656202611&q=dublin&days=3&aqi=no&alerts=no"
      )
      .then((data) => {
        setWeather(data.data);
        console.log(data.data.current);
        console.log(data.data.forecast);
      })
      .catch((err) => console.log(err));
  }, []);

  const weatherInputHandler = (e) => {
    setWeatherInput(e.target.value);
  };

  const searchWeather = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://api.weatherapi.com/v1/forecast.json?key=76cb3407f2014f49902211656202611&q=${weatherInput}&days=3&aqi=no&alerts=no`
      )
      .then((data) => {
        setWeather(data.data);
        console.log(data.data.forecast);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <SearchBar
        searchWeather={searchWeather}
        weatherInputHandler={weatherInputHandler}
      />

      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0)",
          borderRadius: "4px",
          height: "100vh",
          margin: "7vw",
        }}
        className="App"
      >
        {weather && (
          <div className={classes.root}>
            <Typography variant="h5">
              {weather.location.region}, {weather.location.country}
            </Typography>

            <Typography variant="caption" paddingBottom={1}>
              Sun 6th March
            </Typography>
            <Grid container>
              <Grid item xs={3}>
                <img
                  src={weather.current.condition.icon}
                  alt="current condition"
                />
              </Grid>
              <Grid item xs={7}>
                <Typography variant="h1">
                  {weather.current.temp_c}&#176;c
                </Typography>
                <Typography variant="body1">
                  {weather.current.condition.text}
                </Typography>
              </Grid>
            </Grid>
            <Divider />
            <div>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                <Typography variant="h5">Sunday </Typography>
                <ListItem>
                  <ListItemAvatar>
                    <img
                      src={weather.forecast.forecastday[1].day.condition.icon}
                      alt="current condition"
                      height="40px"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={weather.forecast.forecastday[1].day.condition.text}
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar></Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Average"
                    secondary={weather.forecast.forecastday[1].day.avgtemp_c}
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar></Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Sunset"
                    secondary={weather.forecast.forecastday[1].astro.sunset}
                  />
                </ListItem>

                <ListItem>
                  <ListItemAvatar>
                    <Avatar></Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Sunrise"
                    secondary={weather.forecast.forecastday[0].astro.sunrise}
                  />
                </ListItem>
              </List>
            </div>
          </div>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
