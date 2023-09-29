import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { v4 } from "uuid";

async function handler(event: APIGatewayProxyEvent, context: Context) {
  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify(
      "Hello from lambda, here are your bucketsss" +
        JSON.stringify("aksdjlaksdh")
    ),
  };
  console.log(
    "Hello from lambda, here are your bucketsss" +
      JSON.stringify("listBucketResult")
  );

  return response;
}

export { handler };
