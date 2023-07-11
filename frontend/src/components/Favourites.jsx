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
  useToast,
} from "@chakra-ui/react";
import getUserId from "./GetUsername";
import React, { useEffect, useState } from "react";

export default function Favourites() {
  const [data, setData] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
  const API_ICON_URL = import.meta.env.VITE_API_ICON_URL;
  const API_CLOUD_FORMATION = import.meta.env.VITE_API_URL_CLOUD_FORMATION;

  const userId = getUserId();
  const toast = useToast();
  let allCryptoIds = [];

  useEffect(() => {
    const fetchFav = async () => {
      const req = {
        userId: userId,
      };
      const res = await fetch(API_URL + "/favorites/get", {
        method: "POST",
        body: JSON.stringify(req),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const favorites = await res.json();
        if (res.status == 200) {
          const cryptoIds = await Promise.all(
            favorites.map(async (favorite) => {
              const response = await fetch(
                API_URL + "/crypto/" + favorite.cryptoId,
                {
                  method: "GET",
                }
              );
              if (response.ok) {
                const cryptoData = await response.json();
                return cryptoData;
              } else {
                console.log("Failed to fetch data from API Gateway");
              }
            })
          );
          let cryptoArray = [];
          cryptoIds.map((crypto) => {
            if (crypto.length != 0) {
              cryptoArray.push(crypto[0]);
            }
          });
          setData(cryptoArray);
        }
      }
    };
    fetchFav();
  }, [data]);

  return (
    <TableContainer h={"93vh"} p="100" bg={useColorModeValue("gray.100", "black")}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th fontSize={15}>Rank</Th>
            <Th fontSize={15}>Name</Th>
            <Th fontSize={15}>Change(24h)</Th>
            <Th fontSize={15}>Volume</Th>
            <Th fontSize={15}>Price</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row) => (
            <Tr key={row.id}>
              <Td>{row.cmc_rank}</Td>
              <Td>
                <HStack>
                  <Image
                    h={50}
                    w={50}
                    src={API_ICON_URL + "/" + row.symbol.toLowerCase()}
                  ></Image>
                  <Text as="b" fontSize={"xl"}>
                    {" "}
                    {row.name}
                  </Text>
                  <Text color={"gray.500"}>• {row.symbol} </Text>
                </HStack>
              </Td>
              <Td
                style={{
                  color:
                    row.quote.USD.percent_change_24h < 0
                      ? "#ff4d4d"
                      : "#6ccf59",
                }}
              >
                {row.quote.USD.percent_change_24h < 0 ? (
                  <Button
                    bgColor={"rgba(255, 53, 53, 0.1)"}
                    fontSize={"md"}
                    size={"sm"}
                  >
                    <HStack>
                      <TriangleDownIcon boxSize={3} />
                      <Text>
                        {Math.abs(row.quote.USD.percent_change_24h).toFixed(2)}%
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
                      <Text>
                        {row.quote.USD.percent_change_24h.toFixed(2)}%
                      </Text>
                    </HStack>
                  </Button>
                )}{" "}
              </Td>

              <Td>{row.quote.USD.volume_change_24h.toFixed(2)}%</Td>

              <Td>${row.quote.USD.price.toFixed(2)}</Td>
              {/* <Td>
                <Button size={"sm"} onClick={() => addToFavorite(row.symbol)}>
                  ADD
                </Button>
              </Td> */}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
