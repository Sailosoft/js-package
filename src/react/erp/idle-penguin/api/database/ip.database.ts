import { IKorevelDepDexieTable, korevelDexie } from "../IpKorevel.ts";
import { IPUser } from "../user-management/src/ip.user-management.interface.ts";
import { ipDatabaseStore } from "./ip.database.store.ts";

export class IPDatabase extends korevelDexie {
  users!: IKorevelDepDexieTable<IPUser>;
  constructor({ name }: { name: string }) {
    super(name);

    ipDatabaseStore.forEach((store) => {
      this.version(store.version).stores(store.store);
    });
  }
}
