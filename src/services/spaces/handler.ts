import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";

const handler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  let message: string;

  switch (event.httpMethod) {
    case "GET":
      message = "GET Spaces Request";
      break;
    case "POST":
      message = "POST Spaces Request";

      break;
    default:
      break;
  }

  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify(message),
  };

  return response;
};

export { handler };
