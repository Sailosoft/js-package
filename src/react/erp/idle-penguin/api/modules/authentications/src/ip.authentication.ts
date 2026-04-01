import { IResult, Result } from "../../../core/result/result.ts";
import { IPDatabase } from "../../../database/index.ts";
import { IPLogger } from "../../logger/src/ip.logger.ts";
import { IPSecurityHash } from "../../security/src/ip.security.interface.ts";
import { IPUser, IPUserDto } from "../../users/src/index.ts";
import { IIPAuthentication } from "./ip.authentication.interface.ts";

export class IPAuthentication implements IIPAuthentication {
  logger = new IPLogger(this);
  constructor(
    private securityHash: IPSecurityHash,
    private db: IPDatabase,
  ) {}

  async register(userDto: IPUserDto): Promise<IResult<number>> {
    try {
      const passwordHash = await this.securityHash.hash(userDto.password);
      const user: IPUser = {
        name: userDto.name,
        email: userDto.email,
        passwordHash: passwordHash,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      this.logger.log("Registering user");
      const id = await this.db.users.add(user);
      this.logger.log("User registered");
      return Result.success(id);
    } catch (error) {
      this.logger.log("Error registering user", error);
      console.error(error);
      return Result.error("Error registering user");
    }
  }

  async generateToken(user: IPUser): Promise<string> {
    const userSession = JSON.stringify({
      sub: user.id,
      name: user.email,
      exp: Date.now() + 3600000,
    });
    const payload = btoa(userSession);
    return payload;
  }

  async login(
    userDto: Pick<IPUserDto, "email" | "password">,
  ): Promise<IResult<number>> {
    try {
      this.logger.log("Logging in user");
      const user = await this.db.users.get({ email: userDto.email });
      if (!user) {
        return Result.error("User not found");
      }
      const passwordHash = await this.securityHash.hash(userDto.password);
      if (passwordHash !== user.passwordHash) {
        return Result.error("Invalid password");
      }

      return Result.success(user.id!);
    } catch (error) {
      this.logger.log("Error logging in user", error);
      console.error(error);
      throw error;
    }
  }

  async verifyToken(token: string): Promise<boolean> {
    try {
      const userSession = atob(token);
      const user = JSON.parse(userSession);
      if (user.exp < Date.now()) {
        return false;
      }
      return true;
    } catch (error) {
      this.logger.log("Error verifying token", error);
      console.error(error);
      return false;
    }
  }

  async loginAndGenerateToken(
    userDto: Pick<IPUserDto, "email" | "password">,
  ): Promise<IResult<string>> {
    try {
      const userResult = await this.login(userDto);
      if (!userResult.success && userResult.error == "Invalid password") {
        return Result.error("Incorrent credential");
      }
      const user = await this.db.users.get({ id: userResult.data });
      if (!user) {
        return Result.error("User not found");
      }
      const token = await this.generateToken(user);
      return Result.success(token);
    } catch (error) {
      this.logger.log("Error logging in and generating token", error);
      console.error(error);
      return Result.error("Error logging in and generating token");
    }
  }

  async getCurrentUser(token: string): Promise<IResult<IPUser>> {
    try {
      const userSession = atob(token);
      const userSessionDto = JSON.parse(userSession);
      if (userSessionDto.exp < Date.now()) {
        return Result.error("Token expired");
      }
      const user = await this.db.users.get({ id: userSessionDto.sub });
      if (!user) {
        return Result.error("User not found");
      }
      return Result.success(user);
    } catch (error) {
      this.logger.log("Error getting current user", error);
      console.error(error);
      return Result.error("Error getting current user");
    }
  }
}
