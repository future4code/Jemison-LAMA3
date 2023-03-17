import { BaseDatabase } from "./BaseDatabase";
import { IShowDB, Show, TicketDB } from "../model/Show";

export class ShowDatabase extends BaseDatabase {
  public static TABLE_SHOWS = "Lama_Shows";
  public static TABLE_TICKETS = "Lama_Tickets";

  private showModelDB = (show: Show) => {};

  public findShow = async (date: Date): Promise<IShowDB | undefined> => {
    const result: IShowDB[] = await BaseDatabase.connection(
      ShowDatabase.TABLE_SHOWS
    )
      .select()
      .where({ start_time: date });

    return result[0];
  };

  public findShowId = async (id: string): Promise<IShowDB | undefined> => {
    const result: IShowDB[] = await BaseDatabase.connection(
      ShowDatabase.TABLE_SHOWS
    )
      .select()
      .where({ id });

    return result[0];
  };

  public createShow = async (show: Show): Promise<void> => {
    const showDB = this.showModelDB(show);

    await BaseDatabase.connection(ShowDatabase.TABLE_SHOWS).insert(showDB);
  };
  public getShows = async () => {
    const result = await BaseDatabase.connection(ShowDatabase.TABLE_SHOWS);
    const showsModel = result.map((show) => {
      return this.showModelDB(show);
    });
  };
  public getTicketsByShowId = async (id: string): Promise<number> => {
    const result = await BaseDatabase.connection(ShowDatabase.TABLE_TICKETS)
      .select()
      .where({ show_id: id });

    return result.length;
  };
  public findTicket = async (
    idShow: string,
    idUser: string
  ): Promise<TicketDB | undefined> => {
    const result: TicketDB[] = await BaseDatabase.connection(
      ShowDatabase.TABLE_TICKETS
    )
      .select()
      .where({
        show_id: idShow,
        user_id: idUser,
      });
    return result[0];
  };
  public createTicket = async (ticket: TicketDB) => {
    await BaseDatabase.connection(ShowDatabase.TABLE_TICKETS).insert(ticket);
  };
}
