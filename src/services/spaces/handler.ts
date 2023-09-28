import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { postSpaces } from "./PostSpace";
import { getSpaces } from "./GetSpaces";
import { updateSpaces } from "./UpdateSpace";
import { deleteSpace } from "./DeleteSpace";
import { JsonError, MissingFieldError } from "../shared/DataValidator";
import { addCorsHeader } from "../../infra/Utils";

const ddbClient = new DynamoDBClient({});
let response: APIGatewayProxyResult;
const handler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  try {
    switch (event.httpMethod) {
      case "GET":
        response = await getSpaces({ event, ddbClient });
        addCorsHeader(response);
        return response;
      case "POST":
        response = await postSpaces(event, ddbClient);
        addCorsHeader(response);
        return response;
      case "PUT":
        response = await updateSpaces({ event, ddbClient });
        addCorsHeader(response);
        return response;
      case "DELETE":
        response = await deleteSpace({ event, ddbClient });
        addCorsHeader(response);
        return response;
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

    return response;
  }
};

export { handler };
