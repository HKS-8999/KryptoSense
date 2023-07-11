import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Text,
  HStack,
  Box,
  Button,
  Card,
  Image,
  Heading,
  useToast,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import IsLoggedIn from "./IsLoggedIn";
import getUserId from "./GetUsername";

export default function CryptoListing() {
  const [data, setData] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
  const API_ICON_URL = import.meta.env.VITE_API_ICON_URL;

  const userId = getUserId();
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API_URL + "/crypto", {
        method: "GET",
      });
      if (response.ok) {
        const cryptoData = await response.json();

        if (cryptoData !== null) {
          const rows = cryptoData.map((crypto) => ({
            id: crypto.id,
            name: crypto.name,
            symbol: crypto.symbol,
            price: crypto.quote.USD.price,
            percent_change_24h: crypto.quote.USD.percent_change_24h,
            icon: API_ICON_URL + "/" + crypto.symbol.toLowerCase(),
            volume_24h: crypto.quote.USD.volume_change_24h,
            rank: crypto.cmc_rank,
          }));
          setData(rows);
          console.log(rows);
        }
      } else {
        console.log("Failed to fetch data from API Gateway");
      }
    };
    fetchData();
  }, []);

  async function addToFavorite(crypto_symbol) {
    const req = {
      userId: userId,
      crypto_symbol: crypto_symbol.trim().toLowerCase(),
    };

    const res = await fetch(API_URL + "/favorites/add", {
      method: "POST",
      body: JSON.stringify(req),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    console.log(res.status);
    console.log(res.body);
    const res_string = await res.json();
    console.log(res_string);
    if (res.status === 200) {
      toast({
        title: "Added to favorites",
        description:
          "The cryptocurrency has been successfully added to your favorites list.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } else if (res.status === 400) {
      toast({
        title: "Already added to favorites",
        description: "The cryptocurrency is already in your favorites list.",
        status: "warning",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
    } else {
      toast({
        title: "Cannot add to favorites",
        description:
          "An error occurred while adding the cryptocurrency to your favorites list. Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  }

  return (
    
    <TableContainer p="50" bg={useColorModeValue("gray.100", "black")}>
       <Heading
            lineHeight={1.1}
            fontSize={{ base: "3xl", sm: "3xl", md: "4xl", lg: "5xl" }}
            color={"#868689"}
            p={10}
          >
            Stay Ahead of the{" "}<br></br>
            <Text
              as={"span"}
              bgGradient="linear-gradient(60deg, #fffb00, #ff6124)"
              bgClip="text"
            >
              Crypto Game <br></br>
            </Text>{" "}
            with Real-Time Tracking and Insights
          </Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th fontSize={15}>Rank</Th>
            <Th fontSize={15}>Name</Th>
            <Th fontSize={15}>Change(24h)</Th>
            <Th fontSize={15}>Volume</Th>
            <Th fontSize={15}>Price</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row) => (
            <Tr key={row.id}>
              <Td>{row.rank}</Td>
              <Td>
                <HStack>
                  <Image h={50} w={50} src={row.icon}></Image>
                  <Text as="b" fontSize={"xl"}>
                    {" "}
                    {row.name}
                  </Text>
                  <Text color={"gray.500"}>• {row.symbol} </Text>
                </HStack>
              </Td>
              <Td
                style={{
                  color: row.percent_change_24h < 0 ? "#ff4d4d" : "#6ccf59",
                }}
              >
                {row.percent_change_24h < 0 ? (
                  <Button
                    bgColor={"rgba(255, 53, 53, 0.1)"}
                    fontSize={"md"}
                    size={"sm"}
                  >
                    <HStack>
                      <TriangleDownIcon boxSize={3} />
                      <Text>
                        {Math.abs(row.percent_change_24h).toFixed(2)}%
                      </Text>
                    </HStack>
                  </Button>
                ) : (
                  <Button
                    bgColor={"rgba(52, 199, 89, 0.1)"}
                    fontSize={"md"}
                    size={"sm"}
                  >
                    <HStack>
                      <TriangleUpIcon boxSize={3} />{" "}
                      <Text>{row.percent_change_24h.toFixed(2)}%</Text>
                    </HStack>
                  </Button>
                )}{" "}
              </Td>

              <Td>{row.volume_24h.toFixed(2)}%</Td>

              <Td>${row.price.toFixed(2)}</Td>
              <Td>
                <Button size={"sm"} onClick={() => addToFavorite(row.symbol)}>
                  ADD
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
