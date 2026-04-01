import { IKorevelProvider, IKorevel } from "@korevel/src/modules/core/index.ts";
import { IPAuthentication } from "./ip.authentication.ts";
import { IKorevelRouterRegister } from "@korevel/src/modules/router/index.ts";
import { IPAuthenticationController } from "./ip.authentication.controller.ts";

export class IPAuthenticationProvider implements IKorevelProvider {
  register(app: IKorevel): void | Promise<void> {
    const container = app.getContainer();
    container.registerClass("authentication", IPAuthentication, {
      lifetime: "SINGLETON",
    });
  }
  boot(app: IKorevel): void | Promise<void> {
    const container = app.getContainer();

    const router = container.resolve<IKorevelRouterRegister>("routerRegister");
    router.get("/authentication/hello", IPAuthenticationController, "hello");
  }
}
