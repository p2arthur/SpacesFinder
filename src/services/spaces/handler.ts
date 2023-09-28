import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { postSpaces } from "./PostSpace";
import { getSpaces } from "./GetSpaces";
import { updateSpaces } from "./UpdateSpace";
import { deleteSpace } from "./DeleteSpace";
import { JsonError, MissingFieldError } from "../shared/DataValidator";
import { addCorsHeader } from "../../infra/Utils";

const ddbClient = new DynamoDBClient({});

const handler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    let response: APIGatewayProxyResult;
    addCorsHeader(response);
    switch (event.httpMethod) {
      case "GET":
        response = await getSpaces({ event, ddbClient });
        return response;
      case "POST":
        response = await postSpaces(event, ddbClient);
        return response;
      case "PUT":
        response = await updateSpaces({ event, ddbClient });
        console.log("PUT Response", response);
        return response;
      case "DELETE":
        response = await deleteSpace({ event, ddbClient });
        console.log("DELETE response", response);
      default:
        break;
    }
  } catch (error) {
    if (error instanceof MissingFieldError) {
      return {
        statusCode: 400,
        body: JSON.stringify("Error on handler:" + error.message),
      };
    }

    if (error instanceof JsonError) {
      return {
        statusCode: 400,
        body: JSON.stringify(error.message),
      };
    }

    console.error(error.message);
    return {
      statusCode: 500,
      body: JSON.stringify("Error on handler:" + error.message),
    };
  }
};

export { handler };
