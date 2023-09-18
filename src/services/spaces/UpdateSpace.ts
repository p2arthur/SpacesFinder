import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import {
  DynamoDBClient,
  PutItemCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";

interface UpdateSpacesHandlerInterface {
  event: APIGatewayEvent;
  ddbClient: DynamoDBClient;
}

interface UpdateSpacesInnerFunctionInterface {
  ddbClient: DynamoDBClient;
  spaceId?: string;
}

const updateSpaces = async ({
  event,
  ddbClient,
}: UpdateSpacesHandlerInterface): Promise<APIGatewayProxyResult> => {
  if (event.queryStringParameters.id && event.body) {
    const { id: spaceId } = event.queryStringParameters;
    const { body } = event;
    const parsedBody = JSON.parse(body);

    const requestBodyKey = Object.keys(parsedBody)[0];
    const requestBodyValue = parsedBody[requestBodyKey];

    const updateResult = await ddbClient.send(
      new UpdateItemCommand({
        TableName: process.env.TABLE_NAME,
        Key: { id: { S: spaceId } },
        UpdateExpression: "set #zzzNew = :new",
        ExpressionAttributeNames: { "#zzzNew": requestBodyKey },
        ExpressionAttributeValues: { ":new": { S: requestBodyValue } },
        ReturnValues: "UPDATED_NEW",
      })
    );

    return { statusCode: 200, body: JSON.stringify(updateResult.Attributes) };
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify(
        "Bad request: No Space id was provided on the request"
      ),
    };
  }
};

export { updateSpaces };
