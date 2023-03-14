import { ShowInputDTO, Show, ShowOutputDTO,ShowsOutputDTO, TicketInputDTO } from "../model/Show";
import {RequestError} from "../error/RequestError";
import { Authenticator } from "../services/Authenticator";
//import { UserRole } from "../model/User";
import { ShowDatabase } from "../data/ShowDatabase";
import { IdGenerator } from "../services/IdGenerator";

class ShowBusiness{
    public create = async(input:ShowInputDTO)=>{//:Promise<ShowOutputDTO> 
        const {token, week_day, start_time, end_time, band_id} = input

        if(!token){
            throw new RequestError("Token inválido!")
        }
        const payload = new Authenticator().getTokenPayload(token)

        if(!payload){
            throw new RequestError("Usuário não encontrado")
        }

        
        if(payload){ //payload?.role !== UserRole.ADMIN
            throw new RequestError("Só administrador podem ter acesso")
        }

        /*const start_time = new Date(start)
        const showDate = new Date("2023/13/03")
        if(start_time < showDate){
            throw new Error("gfh")
        }*/
        const showDatabase = new ShowDatabase()
        const showAlreadyExist = await showDatabase.findShow(payload)

        if(showAlreadyExist){
            throw new RequestError("Existe um show nesse dia")
        }
      /*  const id = new IdGenerator().generate()
        const show = new Show(id, band_id, start_time)

        await showDatabase.createShow(show)

        const response:ShowOutputDTO={
            message:`Show de ${show.getBand()} criado com sucesso`,
            show
        }
        return response*/
    }
    public getShows = async () =>{
        const showDatabase = new ShowDatabase()

        const showsDB = await showDatabase.getShows()

        const response={
            shows: showsDB
        }
        return response
    }
    public ticket = async (input: TicketInputDTO) =>{
        const { token, showId } = input

        if(!token){
            throw new RequestError("Token inválido!")
        }
        const payload = new Authenticator().getTokenPayload(token)

        if(!payload){
            throw new RequestError("Usuário não encontrado")
        }

        const showDatabase = new ShowDatabase()

        const showDB = await showDatabase.findShowId(showId)

        if(!showDB){
            throw new RequestError("Show não encontrado")
    }
    const tickets = await showDatabase.getTicketsByShowId(showId)
}
}
export default ShowBusiness