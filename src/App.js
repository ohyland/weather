import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Grid,
  Divider,
  IconButton,
  InputBase,
  Button,
} from "@mui/material";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import { styled, alpha } from "@mui/material/styles";
import { Search as SearchIcon } from "@mui/icons-material";
import { createStyles, makeStyles } from "@mui/styles";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 1),
    display: "flex",

    paddingLeft: `calc(1em + ${theme.spacing(4)})`, // vertical padding + font size from searchIcon
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

let theme = createTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      "& .MuiGrid-container": {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        textAlign: "right",
        padding: "15px",
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
    e.preventDefault();
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
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            ></IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              <form onSubmit={searchWeather}>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    onChange={weatherInputHandler}
                    type="text"
                  />

                  <Button variant="contained" size="small" type="submit">
                    Submit
                  </Button>
                </Search>
              </form>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        sx={{
          margin: "7vw",
          backgroundColor: "rgba(0, 0, 0, 0)",
          borderRadius: "4px",
          height: "100vh",
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
            {/* -------------------------------------- */}
            {/* <Typography variant="h2">
              feels like {weather.current.feelslike_c}&#176;c
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
            </Typography> */}
          </div>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
