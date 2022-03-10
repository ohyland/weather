import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Grid,
  InputBase,
  Toolbar,
  Typography,
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
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  borderRadius: theme.shape.borderRadius,
  position: "relative",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  alignItems: "center",
  display: "flex",
  justifyContent: "space-between",
  marginLeft: 0,
  marginRight: theme.spacing(2),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  alignItems: "center",
  display: "flex",
  height: "100%",
  justifyContent: "center",
  padding: theme.spacing(0, 2),
  pointerEvents: "none",
  position: "absolute",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    display: "flex",
    padding: theme.spacing(1),
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
                    inputProps={{ "aria-label": "search" }}
                    onChange={weatherInputHandler}
                    placeholder="Search…"
                    type="text"
                  />

                  <Button
                    size="small"
                    sx={{ m: 0.5 }}
                    type="submit"
                    variant="contained"
                  >
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
          </div>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
