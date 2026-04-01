import { IKorevelRequest } from "@korevel/src/modules/http/index.ts";
import { IPAuthentication } from "./index.ts";

export class IPAuthenticationController {
  constructor(private authentication: IPAuthentication) {}

  hello(request: IKorevelRequest) {
    return "hello";
  }
}
