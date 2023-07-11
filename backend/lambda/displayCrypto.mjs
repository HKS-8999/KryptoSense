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
  // TODO implement
  console.log(event)
  const response = await fetch(
    "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=" +
      API_KEY
  );

  if (response.status === 200) {
    const data = await response.json();
    console.log(data.data);
    return {
      statusCode: 200,
      body: JSON.stringify(data.data),
    };
  } else {
    console.log("Error fetching API response");
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Something went wrong. Please come back later.",
      }),
    };
  }
};
  