import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { validateAsSpaceEntry } from "../shared/DataValidator";
import { marshall } from "@aws-sdk/util-dynamodb";
import { createRandomId, parseJSON } from "../shared/Utils";

const postSpaces = async (
  event: APIGatewayEvent,
  ddbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> => {
  const randomId = createRandomId();

  const item = parseJSON(event.body);

  if (item) {
    item.id = randomId;

    validateAsSpaceEntry(item);

    const result = await ddbClient.send(
      new PutItemCommand({
        TableName: process.env.TABLE_NAME,
        Item: marshall(item), //This is called Marshalling,
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
