interface ipDataStore<T extends Record<string, string>> {
  version: number;
  store: T;
}

export const ipDatabaseStore: Array<ipDataStore<Record<string, string>>> = [
  {
    version: 1,
    store: {
      users: "++id",
    },
  },
];
