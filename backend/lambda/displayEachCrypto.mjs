
// Use this code snippet in your app.
// If you need more information about configurations or implementing the sample code, visit the AWS docs:
// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started.html

import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

export const handler = async (event) => {
  
  const secret_name = "MySecretForKryptoSense";

  const client = new SecretsManagerClient({
    region: "us-east-1",
  });
  
  let secret_response;
  
  try {
    secret_response = await client.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
      })
    );
  } catch (error) {
    // For a list of exceptions thrown, see
    // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    throw error;
  }
  
  const secret = secret_response.SecretString;
  const API_KEY = JSON.parse(secret).API_KEY
  const cryptocurrencyName = event.pathParameters.name;
  console.log(cryptocurrencyName)
  console.log(API_KEY)

  const response = await fetch(
    "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=" +
      API_KEY
  );

  if (response.status === 200) {
    const data = await response.json();
    console.log(data.data.name);
    const result = data.data.filter(
      (d) => d.name.toLowerCase() === cryptocurrencyName.toLowerCase()
    );
    console.log(result);
    if (result === null) {
      console.log("Error filtering the name in the API response");
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "Please enter valid Name",
        }),
      };
    } else {
      console.log("Success finding name");
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*", // Required for CORS support to work
          "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
        },
        body: JSON.stringify(result),
      };
    }
  } else {
    console.log("Error fetching specific Cryptocurrency description");
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Something went wrong. Please come back later.",
      }),
    };
  }
};
