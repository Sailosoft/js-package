import { IPDatabaseProvider } from "./database/ip.database.provider.ts";
import { Korevel } from "./IpKorevel.ts";
import { IPUserManagementProvider } from "./user-management/src/ip.user-management.provider.ts";

const IpServer = new Korevel();
IpServer.build((builder) => {
  builder.setBaseUrl("http://localhost:8090");
  builder.setProviders([
    new IPDatabaseProvider(),
    new IPUserManagementProvider(),
  ]);
})
  .start()
  .then(() => {
    console.info("IpServer started");
  })
  .catch((error) => {
    console.error("IpServer failed to start");
    throw error;
  });
