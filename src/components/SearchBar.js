import React from "react";
import {
  AppBar,
  Box,
  Button,
  InputBase,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { Search as SearchIcon } from "@mui/icons-material";

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
    maxWidth: "30ch",
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

export const SearchBar = ({ searchWeather, weatherInputHandler }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
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
  );
};
