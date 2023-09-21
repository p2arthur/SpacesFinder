import { v4 } from "uuid";
import { handler } from "../src/services/spaces/handler";

handler(
  {
    httpMethod: "POST",
    // queryStringParameters: { id: "278f11bf-b0c3-4bcc-94c2-64144353c1e4" },
    body: JSON.stringify({
      location: "Vancouver updated x2",
      name: "Workspace in a mall",
    }),
  } as any,
  {} as any
).then((result) => console.log(result));
