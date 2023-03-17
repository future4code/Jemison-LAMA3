/*import { UserRole } from "../../../src/model/User";
import { ITokenPayload } from "../../../src/services/Authenticator";

export class AuthenticatorMock {
    public generateToken = (payload: ITokenPayload): string => {
        switch (payload) {
            case UserRole.ADMIN:
                return "token-mock-admin"
            default:
                return "token-mock-normal"
        }
    }

    getTokenPayload = (token: string): ITokenPayload | null => {
        switch (token) {
            case "token-mock":
                return {
                    id: "id-mock",
                    role: UserRole.NORMAL
                }
            case "token-astrodev":
                return {
                    id: "101",
                    role: UserRole.ADMIN
                }
            default:
                return null
        }
    }
}
*/