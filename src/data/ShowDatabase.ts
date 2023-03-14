import { BaseDatabase } from "./BaseDatabase";
import { IShowDB, Show } from "../model/Show";

export class ShowDatabase extends BaseDatabase{

    public static TABLE_SHOWS = "Lama_Shows"
    public static TABLE_TICKETS = "Lama_Tickets"

    private showModelDB = (show:Show)=>{//:IShowDB
       /* const showDB:IShowDB ={
            id:show.getId(),
            band:show.getBand(),
           // start_time:show.getTickets() //
        }
        return showDB*/
    }

    public findShow = async(date: Date):Promise<IShowDB | undefined> =>{
        const result:IShowDB[] = await BaseDatabase
        .connection(ShowDatabase.TABLE_SHOWS)
        .select()
        .where({ start_time: date})

        return result [0]
    }

    public  findShowId = async(id:string):Promise<IShowDB | undefined> =>{
        const result:IShowDB[] = await BaseDatabase
        .connection(ShowDatabase.TABLE_SHOWS)
        .select()
        .where({ id })

        return result [0]
    }
   


    public createShow = async(show:Show):Promise<void> =>{
        const showDB = this.showModelDB(show)

        await BaseDatabase
        .connection(ShowDatabase.TABLE_SHOWS)
        .insert(showDB)
    }
    public getShows = async()=>{
        const result = await BaseDatabase.connection(ShowDatabase.TABLE_SHOWS)
        const showsModel = result.map((show)=>{
           // return new Show(show.id, show.band, show.start_time)
           return this.showModelDB(show)
        })
    }
    public getTicketsByShowId = async(id: string)=>{
    const result = await BaseDatabase
    .connection(ShowDatabase.TABLE_TICKETS)
}

}