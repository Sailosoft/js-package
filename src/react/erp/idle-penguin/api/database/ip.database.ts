import { korevelDexie } from "@korevel/src/modules/dependencies/index.ts";
import { ipDatabaseStore } from "./ip.database.store.ts";
import { IKorevelDepDexieTable } from "@korevel/src/modules/dependencies/dexie/dexie.def.ts";
import { IPUser } from "../modules/users/src/index.ts";

export class IPDatabase extends korevelDexie {
  users!: IKorevelDepDexieTable<IPUser, number>;
  constructor({ name }: { name: string }) {
    super(name);

    ipDatabaseStore.forEach((store) => {
      this.version(store.version).stores(store.store);
    });
  }
}
