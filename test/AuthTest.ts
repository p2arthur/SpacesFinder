import { AuthService } from "./AuthService";
import * as dotenv from "dotenv";

dotenv.config();

const testAuth = async () => {
  const service = new AuthService();

  const loginResult = await service.login(
    "p2arthur",
    process.env.TEST_PASSWORD
  );

  console.log(
    loginResult.getSignInUserSession().getAccessToken().getJwtToken()
  );
};

testAuth();
