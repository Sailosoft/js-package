import { IPSecurityHash } from "./ip.security.interface.ts";

export class IPSecurityHashClass implements IPSecurityHash {
  encoder = new TextEncoder();
  async hash(password: string): Promise<string> {
    const data = this.encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  async verify(password: string, hash: string): Promise<boolean> {
    const hashPassword = await this.hash(password);
    return hashPassword === hash;
  }
}
