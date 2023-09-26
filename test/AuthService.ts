import { type CognitoUser } from "@aws-amplify/auth";
import { Amplify, Auth } from "aws-amplify";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

const awsRegion = "sa-east-1";

Amplify.configure({
  Auth: {
    region: awsRegion,
    userPoolId: "sa-east-1_ty59Cbi2h",
    userPoolWebClientId: "53k9kcf36a8t9of6qtkbo875pn",
    identityPoolId: "sa-east-1:2bf1b542-6b78-46c2-a435-06dc53b984ac",
    authentictionFlowType: "USER_PASSWORD_AUTH",
  },
});

export class AuthService {
  public async login(userName: string, password: string) {
    const result = (await Auth.signIn(userName, password)) as CognitoUser;
    return result;
  }

  public async generateTemporaryCredentials(user: CognitoUser) {
    const jwtToken = user.getSignInUserSession().getIdToken().getJwtToken();

    const cognitoIdentityPool = `cognito-idp.${awsRegion}.amazonaws.com/sa-east-1_ty59Cbi2h`;
    const cognitoIdentity = new CognitoIdentityClient({
      credentials: fromCognitoIdentityPool({
        identityPoolId: "sa-east-1:2bf1b542-6b78-46c2-a435-06dc53b984ac",
        logins: { [cognitoIdentityPool]: jwtToken },
      }),
    });

    const credentials = await cognitoIdentity.config.credentials();
    return credentials;
  }
}
