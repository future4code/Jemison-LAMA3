import { BaseDatabase } from "./BaseDatabase";
import { User, UserDB } from "../model/User";

export class UserDatabase extends BaseDatabase {

  public static TABLE_USERS = "Lama_Users"

  private toUserModel = (user:User):UserDB=>{
    const userDB:UserDB ={
      id:user.getId(),
      name:user.getName(),
      email:user.getEmail(),
      password:user.getPassword(),
      role:user.getRole()
    }
    return userDB
  }

  public findByEmail = async(email:string):Promise<UserDB | undefined>=>{
    const result:UserDB[] = await BaseDatabase
    .connection(UserDatabase.TABLE_USERS)
    .select()
    .where({email})

    return result[0]
  }
  public createUser = async(user:User):Promise<void>=>{
    const userDB = this.toUserModel(user)

    await BaseDatabase
    .connection(UserDatabase.TABLE_USERS)
    .insert(userDB)
  }
















 /* private static TABLE_NAME = "";

  public async createUser(
    id: string,
    email: string,
    name: string,
    password: string,
    role: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          email,
          name,
          password,
          role
        })
        .into(UserDatabase.TABLE_NAME);
    } catch (error:any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getUserByEmail(email: string): Promise<User> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ email });

    return User.toUserModel(result[0]);
  }*/

}
