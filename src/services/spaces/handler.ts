import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { postSpaces } from "./PostSpace";

const ddbClient = new DynamoDBClient({});

const handler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  let message: string;

  switch (event.httpMethod) {
    case "GET":
      message = "GET Method";
      break;
    case "POST":
      const response = postSpaces(event, ddbClient);
      return response;
    default:
      break;
  }

  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify(message),
  };

  return response;
};

export { handler };
