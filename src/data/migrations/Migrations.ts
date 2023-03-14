import { BaseDatabase } from "../BaseDatabase";

class Migrations extends BaseDatabase{
    execute = async() =>{
        try{
            console.log("Criando as tabelas")
            await this.createTables();
            console.log("Tabelas criadas com sucesso")
        }catch(error:any){
            console.log(error.message)
        }
    }
    createTables = async()=>{
        await BaseDatabase.connection.raw(`

        //DROP TABLE IF EXISTS Lama_Bandas; //Lama_Shows, Lama_Users

        CREATE TABLE IF NOT EXISTS Lama_Bandas (
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            music_genre VARCHAR(255) NOT NULL,
            responsible VARCHAR(255) UNIQUE NOT NULL 
          );
          
          CREATE TABLE IF NOT EXISTS Lama_Shows (
            id VARCHAR(255) PRIMARY KEY,
            week_day VARCHAR(255) NOT NULL,
            start_time INT NOT NULL,
            end_time INT NOT NULL,
            band_id VARCHAR(255) NOT NULL,
            FOREIGN KEY(band_id) REFERENCES Lama_Bandas(id)
          );
          
          CREATE TABLE Lama_Tickets (
            id VARCHAR(255) PRIMARY KEY,
            show_id VARCHAR(255) NOT NULL,
            user_id VARCHAR(255) NOT NULL,
            foreign key (show_id) references Lama_Shows(id),
            foreign key (user_id) references Lama_Users(id)
          );


          CREATE TABLE IF NOT EXISTS Lama_Users (
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            role VARCHAR(255) NOT NULL DEFAULT "NORMAL"
          );
        `)
    }
}
const migrations = new Migrations()

migrations.execute()