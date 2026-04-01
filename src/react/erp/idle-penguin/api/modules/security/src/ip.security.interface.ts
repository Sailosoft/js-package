export interface IPSecurityHash {
  hash(data: string): Promise<string>;
  verify(data: string, hash: string): Promise<boolean>;
}
