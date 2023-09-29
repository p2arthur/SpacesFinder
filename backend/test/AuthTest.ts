import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";
import { AuthService } from "./AuthService";
import * as dotenv from "dotenv";
import { AwsCredentialIdentity } from "@aws-sdk/types";

dotenv.config();

const testAuth = async () => {
  const service = new AuthService();

  const loginResult = await service.login(
    "p2arthur",
    process.env.TEST_PASSWORD
  );

  console.log(
    "Login result:",
    loginResult.getSignInUserSession().getIdToken().getJwtToken()
  );

  const credentials = await service.generateTemporaryCredentials(loginResult);
  console.log(credentials);

  const s3Buckets = await listBuckets(credentials);

  console.log(s3Buckets);
};

const listBuckets = async (credentials: AwsCredentialIdentity) => {
  const client = new S3Client({ credentials: credentials });

  const command = new ListBucketsCommand({});

  const result = await client.send(command);

  return result;
};

testAuth();
