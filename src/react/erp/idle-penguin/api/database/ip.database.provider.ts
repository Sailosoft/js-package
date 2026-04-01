import { IKorevel, IKorevelProvider } from "@korevel/src/modules/core/index.ts";
import { IPDatabase } from "./ip.database.ts";

export class IPDatabaseProvider implements IKorevelProvider {
  register(app: IKorevel) {
    const container = app.getContainer();
    const database = new IPDatabase({ name: "idle-penguin-db" });
    container.registerValue("db", database);
  }

  boot() {}
}
