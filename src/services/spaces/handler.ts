import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";

const handler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  let message: string;

  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify(message),
  };

  return response;
};

export { handler };
