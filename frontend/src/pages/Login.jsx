import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  HStack,
  Heading,
  Input,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const avatars = [
  {
    name: "Ryan Florence",
    url: "https://bit.ly/ryan-florence",
  },
  {
    name: "Segun Adebayo",
    url: "https://bit.ly/sage-adebayo",
  },
  {
    name: "Kent Dodds",
    url: "https://bit.ly/kent-c-dodds",
  },
  {
    name: "Prosper Otemuyiwa",
    url: "https://bit.ly/prosper-baba",
  },
  {
    name: "Christian Nwamba",
    url: "https://bit.ly/code-beast",
  },
];

export default function Login() {
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
      console.log(response)
      const body = await response.json();
      console.log(body)
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
      } else if(response.status === 401){
        toast({
          title: "Incorrect Password",
          description: "Please enter valid password.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
      else {
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

  return (
    <Box h={"93vh"}>
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
      >
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
            color={"#868689"}
          >
            Track{" "}
            <Text
              as={"span"}
              bgGradient="linear-gradient(60deg, #fffb00, #ff6124)"
              bgClip="text"
            >
              YOUR
            </Text>{" "}
            Crypto,
            <Text
              as={"span"}
              bgGradient="linear-gradient(60deg, #fffb00, #ff6124)"
              bgClip="text"
            >
              YOUR
            </Text>{" "}
            Way!
          </Heading>
          <Stack direction={"row"} spacing={4} align={"center"}>
            <AvatarGroup>
              {avatars.map((avatar) => (
                <Avatar
                  key={avatar.name}
                  name={avatar.name}
                  src={avatar.url}
                  size={useBreakpointValue({ base: "md", md: "lg" })}
                  position={"relative"}
                  zIndex={2}
                  _before={{
                    content: '""',
                    width: "full",
                    height: "full",
                    rounded: "full",
                    transform: "scale(1.125)",
                    // bgGradient: 'linear(to-bl, red.400,pink.400)',
                    position: "absolute",
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
              ))}
            </AvatarGroup>
            <Text fontFamily={"heading"} fontSize={{ base: "4xl", md: "6xl" }}>
              +
            </Text>
            <Flex
              align={"center"}
              justify={"center"}
              fontFamily={"heading"}
              fontSize={{ base: "sm", md: "lg" }}
              bg={"gray.800"}
              color={"white"}
              rounded={"full"}
              minWidth={useBreakpointValue({ base: "44px", md: "60px" })}
              minHeight={useBreakpointValue({ base: "44px", md: "60px" })}
              position={"relative"}
              _before={{
                content: '""',
                width: "full",
                height: "full",
                rounded: "full",
                transform: "scale(1.125)",
                bgGradient: "linear(to-bl, orange.400,yellow.400)",
                position: "absolute",
                zIndex: -1,
                top: 0,
                left: 0,
              }}
            >
              YOU
            </Flex>
          </Stack>
        </Stack>
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: "lg" }}
        >
          <Stack spacing={4}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            >
              Sign In
              <Text
                as={"span"}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                !
              </Text>
            </Heading>
            <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              Empower Your Crypto Journey - Join Our All-In-One Crypto Tracking
              App Today!
            </Text>
          </Stack>
          <Box as={"form"} mt={10}>
            <VStack spacing={4} align="stretch">
              <FormControl id="email" isRequired>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  placeholder="Email"
                  onChange={(event) => setUsername(event.target.value)}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </FormControl>

              <Button
                fontFamily={"heading"}
                mt={8}
                w={"full"}
                bgGradient="linear(to-r, red.400,pink.400)"
                color={"white"}
                _hover={{
                  bgGradient: "linear(to-r, red.400,pink.400)",
                  boxShadow: "xl",
                }}
                onClick={login}
              >
                Sign In
              </Button>
              <HStack justifyContent="space-between">
                <Link to={"/signup"}>
                  <Text as="span" color="gray.500">
                    Don't have a KryptoSense account?{" "}
                  </Text>
                  <Text
                    as="span"
                    bgClip="text"
                    bgGradient="linear(to-r, red.400,pink.400)"
                  >
                    Sign Up
                  </Text>
                </Link>
              </HStack>
            </VStack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
