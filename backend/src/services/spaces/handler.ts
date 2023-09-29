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
  let response: APIGatewayProxyResult;
  try {
    switch (event.httpMethod) {
      case "GET":
        response = await getSpaces({ event, ddbClient });
        break;
      case "POST":
        response = await postSpaces(event, ddbClient);
        break;
      case "PUT":
        response = await updateSpaces({ event, ddbClient });
        break;

      case "DELETE":
        response = await deleteSpace({ event, ddbClient });
        break;
      default:
        break;
    }
  } catch (error) {
    if (error instanceof MissingFieldError) {
      response = {
        statusCode: 400,
        body: JSON.stringify("Error on handler:" + error.message),
      };
    }

    if (error instanceof JsonError) {
      response = {
        statusCode: 400,
        body: JSON.stringify(error.message),
      };
    }

    console.error(error.message);
    response = {
      statusCode: 500,
      body: JSON.stringify("Error on handler:" + error.message),
    };
  }
  addCorsHeader(response);
  return response;
};

export { handler };
