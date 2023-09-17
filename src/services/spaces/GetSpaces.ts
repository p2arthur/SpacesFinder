import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";

const getSpaces = async (
  event: APIGatewayEvent,
  ddbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> => {
  const result = await ddbClient.send(
    new ScanCommand({ TableName: process.env.TABLE_NAME })
  );

  console.log(result.Items);

  return {
    statusCode: 201,
    body: JSON.stringify(result.Items),
  };
};

export { getSpaces };
