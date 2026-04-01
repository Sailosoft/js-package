import { IKorevel, IKorevelProvider } from "@korevel/src/modules/core/index.ts";
import { IPSecurityHashClass } from "./ip.security-hash.ts";

export class IPSecurityProvider implements IKorevelProvider {
  register(app: IKorevel): void | Promise<void> {
    const container = app.getContainer();
    container.registerClass("securityHash", IPSecurityHashClass, {
      lifetime: "SINGLETON",
    });
  }
  boot(app: IKorevel): void | Promise<void> {}
}
