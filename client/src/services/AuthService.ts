import { type CognitoUser } from "@aws-amplify/auth";
import { Amplify, Auth } from "aws-amplify";
import { AuthStack } from "../../../backend/outputs.json";

const awsRegion = "sa-east-1";

Amplify.configure({
  Auth: {
    mandatorySignIn: false,
    region: awsRegion,
    userPoolId: AuthStack.SpacesUserPoolId,
    userPoolWebClientId: AuthStack.SpacesUserPoolClientId,
    identityPoolId: AuthStack.SpacesIdentityPoolId,
    authenticationFlowType: "USER_PASSWORD_AUTH",
  },
});

export class AuthService {
  private user: CognitoUser | undefined;

  public async login(
    userName: string,
    password: string
  ): Promise<Object | undefined> {
    try {
      this.user = (await Auth.signIn(userName, password)) as CognitoUser;
      return this.user;
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }

  public getUserName() {
    return this.user?.getUsername();
  }
}
