export interface ShowInputDTO {
  token: string;
  week_day: string;
  start_time: string;
  end_time: string;
  band_id: string;
}
export interface TicketDB {
  id: string;
  show_id: string;
  user_id: string;
}

export interface TicketInputDTO {
  token: string;
  showId: string;
}
export interface TicketOutPutDTO {
  message: string;
  showDate: Date;
  band: string;
}

export interface ShowOutputDTO {
  message: string;
  show: Show;
}
export interface ShowsOutputDTO {
  shows: Show[];
}
export interface IShowDB {
  id: string;
  band: string;
  start_time: Date;
}
export class Show {
  constructor(
    private id: string,
    private band: string,
    private startTime: Date,
    private tickets: number
  ) {}

  public getId = () => {
    return this.id;
  };

  public getBand = () => {
    return this.band;
  };
  public getTime = () => {
    return this.tickets;
  };
  public getTickets = () => {
    return this.tickets;
  };

  public setTicket = (newTicket: number) => {
    this.tickets = newTicket;
  };

  public setId(id: string) {
    this.id = id;
  }
}
