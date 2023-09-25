import { type CognitoUser } from "@aws-amplify/auth";
import { Amplify, Auth } from "aws-amplify";

const awsRegion = "sa-east-1";

Amplify.configure({
  Auth: {
    region: awsRegion,
    userPoolId: "sa-east-1_D154GeeS1",
    userPoolWebClientId: "5bo36kffld2ut7lm92v6qvvoes",
    authentictionFlowType: "USER_PASSWORD_AUTH",
  },
});

export class AuthService {
  public async login(userName: string, password: string) {
    const result = (await Auth.signIn(userName, password)) as CognitoUser;
    return result;
  }
}
