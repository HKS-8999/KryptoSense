import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

// const NavLink = ({ children }) => (
//     <Link
//         px={2}
//         py={1}
//         rounded={'md'}
//         _hover={{
//             textDecoration: 'none',
//             bg: useColorModeValue('gray.200', 'gray.700'),
//         }}
//         href={'#'}>
//         {children}
//     </Link>
// );

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigateTo = useNavigate();
  function handleLogout() {
    localStorage.removeItem("authToken");
    navigateTo("/login");
  }

  function handleFavorites() {
    navigateTo("/favorite");
  }
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "black")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <HStack>
              <Box>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 2000 2000"
                  width="60"
                  height="100"
                >
                  <circle cx="1000" cy="1000" r="1000" />
                  <path
                    fill="none"
                    stroke="#868689"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="80"
                    d="m680.39 725.61l319.58 1003.6-474.21-297.14 154.63-706.46 319.58-436.61v306.23l-474.21 836.84h948.9l-474.21-836.84v-306.23l319.58 436.61 154.63 706.46-474.21 297.14 319.58-1003.6"
                  />
                </svg>
              </Box>
              <Text
                bgGradient="linear-gradient(110.1deg, rgb(34, 126, 34) 2.9%, rgb(168, 251, 60) 90.3%);"
                bgClip="text"
                fontSize="5xl"
                fontWeight="extrabold"
                ml="20px"
              >
                KryptoSense
              </Text>
            </HStack>
          </Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button
                bgClip={"text"}
                bgGradient={
                  "radial-gradient(circle at 10% 20%, rgb(85, 149, 27) 0.1%, rgb(183, 219, 87) 90%);"
                }
                fontSize="lg"
                onClick={handleFavorites}
                _hover={{ // Define styles for hover effect
                  bgGradient:
                    "radial-gradient(circle at 10% 20%, rgb(85, 149, 27) 0.1%, rgb(183, 219, 87) 90%);" // Set the same background gradient on hover
                }}
              >
                Favorites
              </Button>
              <Button
                bgClip={"text"}
                bgGradient={
                  "radial-gradient(circle at 10% 20%, rgb(85, 149, 27) 0.1%, rgb(183, 219, 87) 90%);"
                }
                fontSize="lg"
                onClick={handleLogout}
                _hover={{ // Define styles for hover effect
                  bgGradient:
                    "radial-gradient(circle at 10% 20%, rgb(85, 149, 27) 0.1%, rgb(183, 219, 87) 90%);" // Set the same background gradient on hover
                }}
              >
                Logout
              </Button>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
