import { IKorevelRequest } from "@korevel/src/modules/http/index.ts";
import { IPAuthentication } from "./index.ts";
import { KorevelHttpController } from "@korevel/src/modules/http/src/korevel-http.controller.ts";
import { IPUserDto } from "../../users/src/index.ts";

export class IPAuthenticationController extends KorevelHttpController {
  constructor(private authentication: IPAuthentication) {
    super();
  }

  hello(request: IKorevelRequest) {
    return "hello";
  }

  async register(request: IKorevelRequest<IPUserDto>) {
    const result = await this.authentication.register(request.body);

    if (result.success) {
      this.ok(result.data);
    } else {
      this.badRequest(result.error || "Error registering user");
    }
  }

  async login(request: IKorevelRequest<Pick<IPUserDto, "email" | "password">>) {
    const result = await this.authentication.loginAndGenerateToken(
      request.body,
    );

    if (result.success) {
      this.ok({
        token: result.data,
        username: request.body.email,
      });
    } else {
      this.unauthorized(result.error || "Invalid credentials");
    }
  }

  async getCurrentUser(request: IKorevelRequest) {
    const token = request.headers.authorization;
    if (!token) {
      return this.unauthorized("No token provided");
    }
    const result = await this.authentication.getCurrentUser(token);

    if (result.success) {
      this.ok(result.data);
    } else {
      this.unauthorized(result.error || "Invalid credentials");
    }
  }
}
