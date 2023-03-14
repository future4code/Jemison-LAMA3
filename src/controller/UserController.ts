import { Request, Response } from "express";
import { UserInputDTO, UserLoginInputDTO} from "../model/User";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";

export class UserController {
    async signup(req: Request, res: Response) {
        try {

            const input: UserInputDTO = {
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
                role: req.body.role
            }

            const userBusiness = new UserBusiness();
            const response = await userBusiness.signup(input);
           // const token = await userBusiness.createUser(input);

            //res.status(200).send({ token });
            res.status(201).send(response);

        } catch (error:any) {
            res.status(error.statusCode || 500).send({ message: error.message });
        }

        //await BaseDatabase.destroyConnection();
    }

    async login(req: Request, res: Response) {

        try {

            const input:UserLoginInputDTO = {
                email: req.body.email,
                password: req.body.password
            };
            
            const userBusiness = new UserBusiness();

            const response = await userBusiness.login(input)

            res.status(201).send(response)

        }catch (error: any){
            res.status(error.statusCode || 500).send({ message: error.message });
        }
   /* async login(req: Request, res: Response) {

        try {

            const loginData: LoginInputDTO = {
                email: req.body.email,
                password: req.body.password
            };

            const userBusiness = new UserBusiness();
            const token = await userBusiness.getUserByEmail(loginData);

            res.status(200).send({ token });

        } catch (error:any) {
            res.status(400).send({ error: error.message });
        }

        //await BaseDatabase.destroyConnection();
    }*/

    }
}