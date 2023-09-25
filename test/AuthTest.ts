import { AuthService } from "./AuthService";

const testAuth = async () => {
  const service = new AuthService();

  const loginResult = await service.login("p2arthur", "*420420Rabelo");

  console.log(
    loginResult.getSignInUserSession().getAccessToken().getJwtToken()
  );
};

testAuth();
