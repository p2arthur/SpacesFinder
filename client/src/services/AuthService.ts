import { type CognitoUser } from "@aws-amplify/auth";
import { Amplify, Auth } from "aws-amplify";
import { AuthStack } from "../../../backend/outputs.json";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

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

let jwtToken;

export class AuthService {
  private user: CognitoUser | undefined;
  private jwtToken: string | undefined;
  private temporaryCredentials: Object | undefined;

  public async login(
    userName: string,
    password: string
  ): Promise<Object | undefined> {
    try {
      this.user = (await Auth.signIn(userName, password)) as CognitoUser;
      jwtToken = this.user?.getSignInUserSession()?.getIdToken().getJwtToken();

      console.log(this.jwtToken);

      console.log(this.user);

      return this.user;
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }

  public async getTemporaryCredentials() {
    console.log(this.jwtToken);
    if (this.temporaryCredentials) {
      console.log("temporaray credentials:", this.temporaryCredentials);
      return this.temporaryCredentials;
    }
    this.temporaryCredentials = await this.generateTemporaryCredentials();
    console.log("temporaray credentials:", this.temporaryCredentials);
    return this.temporaryCredentials;
  }

  public getUserName() {
    return this.user?.getUsername();
  }

  private async generateTemporaryCredentials() {
    const cognitoIdentityPool = `cognito-idp.${awsRegion}.amazonaws.com/${AuthStack.SpacesUserPoolId}`;

    console.log("cognito identity pool", cognitoIdentityPool);

    console.log("jwtToken from generate temporary credentials", this.jwtToken);

    const cognitoIdentity = new CognitoIdentityClient({
      credentials: fromCognitoIdentityPool({
        clientConfig: { region: awsRegion },
        identityPoolId: AuthStack.SpacesIdentityPoolId,
        logins: { [cognitoIdentityPool]: jwtTokenVar! },
      }),
    });
    const credentials = await cognitoIdentity.config.credentials();
    this.temporaryCredentials = credentials;
    return credentials;
  }
}
