import { User, UserInputDTO, UserOutputDTO, UserRole, UserLoginInputDTO } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator, ITokenPayload } from "../services/Authenticator";
import { MissingFields } from "../error/MissingFields";
import { ValueError } from "../error/ValueError";
import { RequestError } from "../error/RequestError";
import { ConflitError } from "../error/ConflitError";


export class UserBusiness {

    public signup = async(input: UserInputDTO) => { //:Promise<UserOutputDTO>
        const {name, email, password} = input;

        if(!name ||!email ||!password) {
            throw new MissingFields()
        }

        if(typeof name !== "string"){
            throw new ValueError("O nome deve ser uma string")
        }

        if(typeof email !== "string"){
            throw new ValueError("O e-mail é uma string")
        }

        if(typeof password !== "string"){
            throw new ValueError("Password inválido")
        }

        if(name.length < 3){
            throw new RequestError("Name deve ter no mínimo 3 caracteres")
        }
        if(password.length < 6){
            throw new RequestError("Password deve ter no mínimo 6 caracteres")
        }

        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            throw new RequestError("E-mail inválido")
        }

        const userDatabase = new UserDatabase()

        const isEmailAlreadyExists = await userDatabase.findByEmail(email)

        if(isEmailAlreadyExists){
            throw new ConflitError("Este e-mail já foi cadastrado")
        }
        /**/const id = new IdGenerator().generate()
        const hashPassword = await new HashManager().hash(password)

        const user = new User(id, name, email, hashPassword, UserRole.NORMAL)// role: UserRole.NORMAL  USER_ROLES.NORMAL

      console.log(user)

       await userDatabase.createUser(user)

       const payload:ITokenPayload ={
        id:user.getId(),
        //role:user.getRole()
       }

       const token = new Authenticator().generateToken(payload)

       const response:UserOutputDTO={
        message: `Usuário ${user.getName()} cadastrado com sucesso`,
        token
       }
       return response
    }

    
    public login = async(input: UserLoginInputDTO) => { 
        const {email, password} = input;

        if(!email ||!password) {
            throw new MissingFields()
        }

        if(typeof email !== "string"){
            throw new ValueError("O e-mail é uma string")
        }

        if(typeof password !== "string"){
            throw new ValueError("Password inválido")
        }

        if(password.length < 6){
            throw new RequestError("Password deve ter no mínimo 6 caracteres")
        }

        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            throw new RequestError("E-mail inválido")
        }

        const userDatabase = new UserDatabase()

        const userDB = await userDatabase.findByEmail(email)

        if(!userDB){
            throw new ConflitError("E-mail não cadastrado")
        }

        const user = new User(userDB.id, userDB.name, userDB.email, userDB.password, userDB.role)

      const isPasswordCorret = await new HashManager().compare(password, user.getPassword())

        if(!isPasswordCorret){
            throw new ConflitError("Password incorreto")
        }

       const payload:ITokenPayload ={
        id:user.getId(),
       //role:user.getRole()
       }

       const token = new Authenticator().generateToken(payload)

       const response:UserOutputDTO={
        message: `Usuário ${user.getName()} logado com sucesso`,
        token
       }
       return response
    }
}





 /*async createUser(user: UserInputDTO) {

        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        const hashManager = new HashManager();
        const hashPassword = await hashManager.hash(user.password);

        const userDatabase = new UserDatabase();
        await userDatabase.createUser(id, user.email, user.name, hashPassword, user.role);

        const authenticator = new Authenticator();
        const accessToken = authenticator.generateToken({ id, role: user.role });

        return accessToken;
    }

    async getUserByEmail(user: LoginInputDTO) {

        const userDatabase = new UserDatabase();
        const userFromDB = await userDatabase.getUserByEmail(user.email);

        const hashManager = new HashManager();
        const hashCompare = await hashManager.compare(user.password, userFromDB.getPassword());

        const authenticator = new Authenticator();
        const accessToken = authenticator.generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() });

        if (!hashCompare) {
            throw new Error("Invalid Password!");
        }

        return accessToken;*/