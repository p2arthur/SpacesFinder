import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { randomUUID } from "crypto";

export function createRandomId() {
  return randomUUID();
}
