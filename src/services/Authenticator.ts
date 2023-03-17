import * as jwt from "jsonwebtoken";

export interface ITokenPayload {
  id: string;
}

export class Authenticator {
  public generateToken(
    input: AuthenticationData,
    expiresIn: string = process.env.ACCESS_TOKEN_EXPIRES_IN!
  ): string {
    const token = jwt.sign(
      {
        id: input.id,
        role: input.role,
      },
      process.env.JWT_KEY as string,
      {
        expiresIn,
      }
    );
    return token;
  }

  getTokenPayload = (token: string): ITokenPayload | null => {
    try {
      const payload = jwt.verify(token, process.env.JWT_KEY as string);

      return payload as ITokenPayload;
    } catch (error) {
      return null;
    }
  };

  public getData(token: string): AuthenticationData {
    const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;
    const result = {
      id: payload.id,
      role: payload.role,
    };
    return result;
  }
}

interface AuthenticationData {
  id: string;
  role?: string;
}
