import {
  DynamoDBClient,
  GetItemCommand,
  GetItemCommandOutput,
  ScanCommand,
  ScanCommandOutput,
} from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { unmarshall, marshall } from "@aws-sdk/util-dynamodb";

interface GetSpacesHandlerInterface {
  event: APIGatewayEvent;
  ddbClient: DynamoDBClient;
}

interface GetSpacesInnerFunctionInterface {
  ddbClient: DynamoDBClient;
  spaceId?: string;
}

const fetchSpacesById = async ({
  ddbClient,
  spaceId,
}: GetSpacesInnerFunctionInterface): Promise<GetItemCommandOutput> => {
  const getItemResponse = await ddbClient.send(
    new GetItemCommand({
      TableName: process.env.TABLE_NAME,
      Key: { id: { S: spaceId } },
    })
  );
  return getItemResponse;
};

const scanSpaces = async ({ ddbClient }: GetSpacesInnerFunctionInterface) => {
  const result = await ddbClient.send(
    new ScanCommand({ TableName: process.env.TABLE_NAME })
  );
};

const getSpaces = async ({
  event,
  ddbClient,
}: GetSpacesHandlerInterface): Promise<APIGatewayProxyResult> => {
  let response: any;
  if (event.queryStringParameters) {
    const id = event.queryStringParameters.id;
    try {
      const space = (response = await fetchSpacesById({
        ddbClient,
        spaceId: id,
      }));

      if (space.Item) {
        console.log("Get item by ID Response:", response);
        return { statusCode: 201, body: JSON.stringify(response) };
      } else {
        console.log("Error getting space with the given id");
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      const spaces = scanSpaces({ ddbClient });
      console.log(JSON.stringify(spaces));
      return { statusCode: 201, body: JSON.stringify(spaces) };
    } catch (error) {
      console.error(error);
    }
  }
};

export { getSpaces };
