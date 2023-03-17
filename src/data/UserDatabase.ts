import { BaseDatabase } from "./BaseDatabase";
import { User, UserDB } from "../model/User";

export class UserDatabase extends BaseDatabase {
  public static TABLE_USERS = "Lama_Users";

  public toUserModel = (user: User): UserDB => {
    const userDB: UserDB = {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      password: user.getPassword(),
      role: user.getRole(),
    };
    return userDB;
  };

  public findByEmail = async (email: string): Promise<UserDB | undefined> => {
    const result: UserDB[] = await BaseDatabase.connection(
      UserDatabase.TABLE_USERS
    )
      .select()
      .where({ email });

    return result[0];
  };
  public createUser = async (user: User): Promise<void> => {
    const userDB = this.toUserModel(user);

    await BaseDatabase.connection(UserDatabase.TABLE_USERS).insert(userDB);
  };
}
