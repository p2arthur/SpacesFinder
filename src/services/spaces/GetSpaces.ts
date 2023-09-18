import {
  DynamoDBClient,
  GetItemCommand,
  GetItemCommandOutput,
  ScanCommand,
  ScanCommandOutput,
} from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { unmarshall } from "@aws-sdk/util-dynamodb";

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
  try {
    const getItemResponse = await ddbClient.send(
      new GetItemCommand({
        TableName: process.env.TABLE_NAME,
        Key: { id: { S: spaceId } },
      })
    );
    return getItemResponse;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const scanSpaces = async ({ ddbClient }: GetSpacesInnerFunctionInterface) => {
  try {
    const result = await ddbClient.send(
      new ScanCommand({ TableName: process.env.TABLE_NAME })
    );

    return result;
  } catch (error) {
    console.error("Error scanning spaces:", error);
    throw error;
  }
};

const getSpaces = async ({
  event,
  ddbClient,
}: GetSpacesHandlerInterface): Promise<APIGatewayProxyResult> => {
  let response: any;
  if (event.queryStringParameters) {
    const { id } = event.queryStringParameters;
    try {
      response = await fetchSpacesById({
        ddbClient,
        spaceId: id,
      });

      if (response.Item) {
        const unmarshalledItem = unmarshall(response.Item);

        console.log("Get item by ID Response:", unmarshalledItem);
        return { statusCode: 201, body: JSON.stringify(unmarshalledItem) };
      } else {
        console.log("Error getting space with the given id");
      }
    } catch (error) {
      console.error(error);
      return { statusCode: 500, body: "Internal error" };
    }
  } else {
    try {
      response = await scanSpaces({ ddbClient });

      const unmarshalledSpaces = response.Items.map((space) => {
        return unmarshall(space);
      });
      return { statusCode: 201, body: JSON.stringify(unmarshalledSpaces) };
    } catch (error) {
      console.error(error);
      return { statusCode: 500, body: "Internal error" };
    }
  }
};

export { getSpaces };
