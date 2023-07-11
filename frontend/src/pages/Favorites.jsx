import React, { Component } from "react";
import Favourites from "../components/Favourites";
import { Box } from "@chakra-ui/react";
import IsLoggedIn from "../components/IsLoggedIn";

class Favorites extends Component {
  render() {
    return (
      <Box h={"100%"}>
        {IsLoggedIn() ? (
          <>
            <Favourites></Favourites>
          </>
        ) : (
          <Login />
        )}
      </Box>
    );
  }
}

export default Favorites;
