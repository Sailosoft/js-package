import { IPDatabaseProvider } from "./database/ip.database.provider.ts";
import { IPAuthenticationProvider } from "./modules/authentications/src/ip.authentication.provider.ts";
import { IPSecurityProvider } from "./modules/security/src/ip.security.provider.ts";
import Korevel from "@korevel/src/korevel.ts";

const IpServer = new Korevel();
IpServer.build((builder) => {
  builder.setBaseUrl("http://localhost:8090");
  builder.setProviders([
    new IPDatabaseProvider(),
    new IPSecurityProvider(),
    new IPAuthenticationProvider(),

    // new IPUserManagementProvider(),
  ]);
})
  .start()
  .then(() => {
    console.info("IpServer started");
    window.dispatchEvent(new CustomEvent("systemStartUp"));
  })
  .catch((error) => {
    console.error("IpServer failed to start");
    throw error;
  });
