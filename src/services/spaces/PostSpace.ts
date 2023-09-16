import { Context, APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";

const postSpaces = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify("POST request"),
  };

  return response;
};

export { postSpaces };
