import {
  DynamoDBClient,
  GetItemCommand,
  GetItemCommandOutput,
  ScanCommand,
  ScanCommandOutput,
} from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";

const getSpaces = async (
  event: APIGatewayEvent,
  ddbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> => {
  if (event.queryStringParameters) {
    const spaceId = event.queryStringParameters.id;
    const getItemResponse = await ddbClient.send(
      new GetItemCommand({
        TableName: process.env.TABLE_NAME,
        Key: { id: { S: spaceId } },
      })
    );

    if (getItemResponse.Item) {
      return { statusCode: 201, body: JSON.stringify(getItemResponse.Item) };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify(`Item with id ${spaceId} not found!`),
      };
    }
  } else {
    const result = await ddbClient.send(
      new ScanCommand({ TableName: process.env.TABLE_NAME })
    );

    console.log(result.Items);
  }
};

export { getSpaces };
