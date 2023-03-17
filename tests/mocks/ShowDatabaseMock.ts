import { BaseDatabase } from "../../src/data/BaseDatabase";
import { IShowDB, Show, TicketDB } from "../../src/model/Show";

export class ShowDatabaseMock extends BaseDatabase{

    public static TABLE_SHOWS = "Lama_Shows"
    public static TABLE_TICKETS = "Lama_Tickets"

    public showModelDB = (show:Show)=>{
    
    }

    public findShow = async(date: Date) =>{
        
        
    }

    public  findShowId = async(id:string) =>{
       
    }
   


    public createShow = async(show:Show):Promise<void> =>{
     
    }
    public getShows = async()=>{
      
        }
    }
   