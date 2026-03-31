import { IPDatabase } from "../../database/ip.database.ts";
import { IKorevel, IKorevelProvider, KorevelLogger } from "../../IpKorevel.ts";

export class IPUserManagementProvider implements IKorevelProvider {
  logger = new KorevelLogger({ instance: this, scopeTagColor: "#de3232" });
  async register(app: IKorevel) {}
  async boot(app: IKorevel) {
    const container = app.getContainer();
    const database = container.resolve<IPDatabase>("database");
    const number = await database.users.count();

    this.logger.log("Getting Users with count", number);
    if (number == 0) {
      this.logger.log("Seeding Users");
      database.users.add({
        name: "Admin",
        email: "admin@adm.com",
        passwordHash: "admin",
      });
      this.logger.log("Users Seeded");
    }
  }
}
