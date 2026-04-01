import { KorevelLogger } from "@korevel/src/modules/logger/index.ts";

export class IPLogger extends KorevelLogger {
  constructor(instance: any) {
    super({ instance });
    this.scopeTagColor = "#c3ce29ff";
  }
}
