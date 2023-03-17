/*import { UserBusiness } from "../../src/business/UserBusiness";
import { BaseError } from "../../src/error/BaseError";
import { UserLoginInputDTO } from "../../src/model/User";
import { AuthenticatorMock } from "../mocks/AuthenticatorMock";
import { HashManagerMock } from "../mocks/HashManagerMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";

describe("Testando o método login da UserBusiness", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new HashManagerMock(),
    new AuthenticatorMock()
  );
  test("Um token é retornado quando o login é bem-sucedido", async () => {
    const input: UserLoginInputDTO = {
      email: "astrodev@gmail.com",
      password: "text",
    };
    const response = await userBusiness.login(input);
    expect(response.message).toBe("Login realizado com sucesso");
    expect(response.token).toBe("token-mock-admin");
  });
  test("Erro quando 'password' possuir menos de 6 caracteres", async () => {
    expect.assertions(2);
    try {
      const input: UserLoginInputDTO = {
        email: "fulano@gmail.com",
        name: "Fulano",
        password: "fulano123",
      };
      await userBusiness.signup(input);
    } catch (error) {
      if (error instanceof BaseError) {
        expect(error.message).toBe(400);
        expect(error.message).toBe(
          "Parâmetro 'password' inválido: mínimo de 6 caracteres"
        );
      }
    }
  });
  test("Erro quando 'password' for incorreto", async () => {
    expect.assertions(2);
    try {
      const input: UserLoginInputDTO = {
        email: "astrodev@gmail.com",
        password: "text123",
      };
      await userBusiness.login(input);
    } catch (error) {
      if (error instanceof BaseError) {
        expect(error.message).toBe(409);
        expect(error.message).toBe("Password incorreto");
      }
    }
  });
});
*/