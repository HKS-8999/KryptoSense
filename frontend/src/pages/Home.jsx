import React from "react";
import CryptoListing from "../components/CryptoListing";
import IsLoggedIn from "../components/IsLoggedIn";
import Login from "../pages/Login";
import { Box, Heading, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box h={"93vh"} >
      {IsLoggedIn() ? (
        <>
          <CryptoListing></CryptoListing>
        </>
      ) : (
        <Login />
      )}
    </Box>
  );
}
