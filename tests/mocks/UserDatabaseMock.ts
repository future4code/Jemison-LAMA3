import { BaseDatabase } from "../../src/data/BaseDatabase";
import { User, UserDB, UserRole } from "../../src/model/User";

export class UserDatabaseMock extends BaseDatabase {

  public static TABLE_USERS = "Lama_Users"

  public toUserModel = (user:User):UserDB=>{
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
    switch (email) {
        case "usermock@gmail.com":
            const normalUser: UserDB = {
                id: "id-mock",
                name: "User Mock",
                email: "usermock@gmail.com",
                password: "hash-mock",
                role: UserRole.NORMAL
            }
            return normalUser
        case "astrodev@gmail.com":
            const adminUser: UserDB = {
                id: "id-mock",
                name: "Astrodev",
                email: "astrodev@gmail.com",
                password: "hash",
                role: UserRole.ADMIN
            }
            return adminUser
        default:
            return undefined
    }
  }
  public createUser = async(user:User):Promise<void>=>{
    
  }
}
   