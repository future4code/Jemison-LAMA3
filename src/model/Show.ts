export interface ShowInputDTO{
    token:string,
    week_day:string, 
    start_time:string, 
    end_time:string, 
    band_id:string
}

export interface TicketInputDTO{
    token:string,
    showId:string
}
export interface ShowOutputDTO{
    message: string,
    show: Show
}
export interface ShowsOutputDTO{
    shows: Show[]
}
export interface IShowDB{
    id: string,
    band: string,
    start_time: Date
}
export class Show{
    constructor(
        private id: string,
        private band: string,
        private startTime: Date,
        private tickets: number
    ){}


public getId = ()=>{
    return this.id
}

public getBand = ()=>{
    return this.band
}
public getTime = ()=>{
    return this.tickets
}
}