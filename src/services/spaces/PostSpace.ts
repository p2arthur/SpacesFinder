import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { Context, APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 } from "uuid";

const postSpaces = async (
  event: APIGatewayEvent,
  ddbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> => {
  const randomId = v4();

  const item = JSON.parse(event.body);

  if (item) {
    item.id = randomId;

    const result = await ddbClient.send(
      new PutItemCommand({
        TableName: process.env.TABLE_NAME,
        Item: { id: { S: randomId }, location: { S: item.location } },
      })
    );

    console.log(result);

    console.log("Table Name:" + process.env.TABLE_NAME);

    return { statusCode: 201, body: JSON.stringify({ id: randomId }) };
  } else {
    console.error("Error on posting item");
  }
};

export { postSpaces };
