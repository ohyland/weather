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
  Box,
  Divider,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import moment from "moment";

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
        "https://api.weatherapi.com/v1/forecast.json?key=76cb3407f2014f49902211656202611&q=London&days=7&aqi=no&alerts=no"
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
        `https://api.weatherapi.com/v1/forecast.json?key=76cb3407f2014f49902211656202611&q=${weatherInput}&days=7&aqi=no&alerts=no`
      )
      .then((data) => {
        setWeather(data.data);
        console.log("data", data.data);
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
              {moment(weather.location.localtime).format("MMMM Do YY")}
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
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableBody>
                    {weather.forecast.forecastday.map((eachForecastDay, x) => (
                      <TableRow
                        key={x}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {moment(eachForecastDay.date).format("dddd")}
                        </TableCell>
                        <TableCell>
                          <img
                            src={eachForecastDay.day.condition.icon}
                            alt="current condition"
                            height="30px"
                          />
                        </TableCell>
                        <TableCell align="right">
                          {eachForecastDay.day.mintemp_c}
                        </TableCell>
                        <TableCell align="right">
                          {eachForecastDay.day.maxtemp_c}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
