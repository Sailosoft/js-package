import { IResult } from "../../../core/result/result.ts";
import { IPUser, IPUserDto } from "../../users/src/index.ts";

export interface IIPAuthentication {
  register(userDto: IPUserDto): Promise<IResult<number>>;
  generateToken(user: IPUser): Promise<string>;
  login(
    userDto: Pick<IPUserDto, "email" | "password">,
  ): Promise<IResult<number>>;
  verifyToken(token: string): Promise<boolean>;
  loginAndGenerateToken(
    userDto: Pick<IPUserDto, "email" | "password">,
  ): Promise<IResult<string>>;
  getCurrentUser(token: string): Promise<IResult<IPUser>>;
}
