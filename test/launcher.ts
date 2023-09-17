import { handler } from "../src/services/spaces/handler";

const mamaue = "mamaue";

handler(
  {
    httpMethod: "GET",
    body: JSON.stringify({ location: "Manchester" }),
  } as any,
  {} as any
);
