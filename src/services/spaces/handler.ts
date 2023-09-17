import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { postSpaces } from "./PostSpace";
import { getSpaces } from "./GetSpaces";

const ddbClient = new DynamoDBClient({});

const handler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    let response: Promise<APIGatewayProxyResult>;
    switch (event.httpMethod) {
      case "GET":
        response = getSpaces(event, ddbClient);
        return response;
      case "POST":
        response = postSpaces(event, ddbClient);
        return response;
      default:
        break;
    }
  } catch (error) {
    console.error(error.message);
    return {
      statusCode: 500,
      body: JSON.stringify("Error on handler:" + error.message),
    };
  }
};

export { handler };
