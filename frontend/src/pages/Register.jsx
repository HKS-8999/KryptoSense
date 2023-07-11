import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  Heading,
  Input,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  useBreakpointValue,
  useToast,
  HStack
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

export default function Register() {
  const toast = useToast();
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    if (
      formData.firstName.length !== 0 &&
      formData.lastName.length !== 0 &&
      formData.email.length !== 0 &&
      formData.password.length !== 0 &&
      formData.confirmPassword.length !== 0
    ) {
      setIsFormValid(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = {};
    const regexName = /^[a-zA-Z]+$/;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexPassword =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#_$%^&*]).{8,}$/;

    if (!formData.firstName || !regexName.test(formData.firstName)) {
      errors.firstName =
        "Please enter a valid first name that contains only letters.";
    }
    if (!formData.lastName || !regexName.test(formData.lastName)) {
      errors.lastName =
        "Please enter a valid last name that contains only letters.";
    }
    if (!formData.email || !regexEmail.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (
      !formData.password ||
      formData.password.length < 8 ||
      !regexPassword.test(formData.password)
    ) {
      errors.password =
        "Password should be at least 8 characters long and contain a combination of uppercase letters, lowercase letters, numbers, and special characters.";
    } else if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(errors).length === 0) {
      console.log("Successful validation.");
      const user = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      };
      const response = await fetch(API_URL + "/register", {
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const body = await response.json();
      if (body.statusCode === 200) {
        toast({
          title: "Registration successful",
          description: "Your account has been created.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        navigate("/login", {
          state: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
          },
        });
      } else if (body.statusCode === 400) {
        toast({
          title: "User already exists",
          description: "User with this email already exists",
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else if (body.statusCode === 500) {
        toast({
          title: "Oops, something went wrong",
          description:
            "Please try again later or contact support for assistance.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          title: "Oops, something went wrong",
          description:
            "Please try again later or contact support for assistance.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        console.log("Server Down");
      }
    } else {
      setFormErrors(errors);
    }
  };
  return (
    <Box h={"100%"}>
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
              Join our Community
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
              <FormControl isRequired isInvalid={formErrors.firstName}>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  placeholder="Firstname"
                />
                <Text color="red.400">{formErrors.firstName}</Text>
              </FormControl>

              <FormControl isRequired isInvalid={formErrors.lastName}>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  placeholder="Lastname"
                />
                <Text color="red.400">{formErrors.lastName}</Text>
              </FormControl>

              <FormControl isRequired isInvalid={formErrors.email}>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  placeholder="fistname@dal.ca"
                />
                <Text color="red.400">{formErrors.email}</Text>
              </FormControl>
              <FormControl isRequired isInvalid={formErrors.password}>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  placeholder="Password"
                />
                <Text color="red.400">{formErrors.password}</Text>
              </FormControl>

              <FormControl isRequired isInvalid={formErrors.confirmPassword}>
                <Input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  placeholder="Confirm Password"
                />
                <Text color="red.400">{formErrors.confirmPassword}</Text>
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
                isDisabled={!isFormValid}
                onClick={handleSubmit}
              >
                Submit
              </Button>
              <HStack justifyContent="space-between">
                <Link to={"/login"}>
                  <Text as="span" color="gray.500">
                    Already have a KryptoSense account?{" "}
                  </Text>
                  <Text as="span"  bgClip="text" bgGradient="linear(to-r, red.400,pink.400)">
                    Sign In
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
