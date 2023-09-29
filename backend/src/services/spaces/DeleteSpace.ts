import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { DeleteItemCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { hasAdminGroup } from "../../infra/Utils";

interface DeleteSpacesHandlerInterface {
  event: APIGatewayEvent;
  ddbClient: DynamoDBClient;
}

const deleteSpace = async ({
  event,
  ddbClient,
}: DeleteSpacesHandlerInterface): Promise<APIGatewayProxyResult> => {
  const isAuthorized = hasAdminGroup(event);

  if (!isAuthorized) {
    return {
      statusCode: 401,
      body: JSON.stringify("Not authorized"),
    };
  }

  if (event.queryStringParameters.id) {
    const spaceId = event.queryStringParameters.id;

    const deleteResult = await ddbClient.send(
      new DeleteItemCommand({
        TableName: process.env.TABLE_NAME,
        Key: { id: { S: spaceId } },
      })
    );

    if (deleteResult) {
      return {
        statusCode: 200,
        body: JSON.stringify(`Deleted space with id ${spaceId}`),
      };
    }

    return {
      statusCode: 404,
      body: JSON.stringify(
        "Could not find a space with the requested Space Id"
      ),
    };
  }
  return {
    statusCode: 400,
    body: JSON.stringify(
      "Bad Request: No Space id was provided on the request"
    ),
  };
};

export { deleteSpace };
