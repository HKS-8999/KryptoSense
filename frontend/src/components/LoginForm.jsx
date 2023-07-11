import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const toast = useToast();
  const validateEmail = (email) => {
    // reference: https://regexr.com/3e48o
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return regex.test(email);
  };

  function handleLogin(token) {
    localStorage.setItem("authToken", token);
  }

  const validatePassword = (password) => {
    if (password.length < 8) {
      return false;
    }
    return true;
  };

  const login = async (event) => {
    event.preventDefault();

    if (username.length === 0 || password.length === 0) {
      setError(true);
      setMessage("Please enter your username and password");
    } else if (!validateEmail(username)) {
      setError(true);
      setMessage("Enter a valid email address");
    } else if (!validatePassword(password)) {
      setError(true);
      setMessage("The password should be more than 8 characters long");
    } else {
      setError(false);

      const response = await fetch(API_URL + "/login", {
        body: JSON.stringify({
          email: username,
          password: password,
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const body = await response.json();

      if (response.status === 200) {
        handleLogin(username);
        toast({
          title: "Login successful",
          description: "Thankyou for logging in",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        navigate("/");
      } else {
        toast({
          title: "User Doesn't Exist",
          description: "Please provide correct details",
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };

  const yellowAccent = "yellow.500";

  return (
    <Flex
      minH={"10vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in </Heading>
          <Text
            color="gray.600"
            fontSize="sm"
            width={"300px"}
            textAlign="center"
          >
            Login to your KryptoSense account to access your watchlist, reviews,
            and more.
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                variant="outline"
                placeholder="johndoe@dal.ca"
                focusBorderColor={yellowAccent}
                mb={3}
                onChange={(event) => setUsername(event.target.value)}
              />{" "}
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                variant="outline"
                placeholder="**********"
                focusBorderColor={yellowAccent}
                mb={6}
                onChange={(event) => setPassword(event.target.value)}
              />{" "}
            </FormControl>

            <Stack spacing={10}>
              <Button
                bg={"yellow.400"}
                color={"white"}
                onClick={login}
                _hover={{
                  bg: "yellow.500",
                }}
              >
                Sign in
              </Button>
              <HStack justifyContent="space-between">
                <Link to={"/signup"}>
                  <Text as="span" color="gray.500">
                    Don't have a KryptoSense account?{" "}
                  </Text>
                  <Text as="span" color={yellowAccent}>
                    Sign Up
                  </Text>
                </Link>
              </HStack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
