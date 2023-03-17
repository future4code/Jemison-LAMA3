import { ShowInputDTO, TicketInputDTO, TicketDB } from "../model/Show";
import { RequestError } from "../error/RequestError";
import { Authenticator } from "../services/Authenticator";
import { ShowDatabase } from "../data/ShowDatabase";
import { IdGenerator } from "../services/IdGenerator";

export class ShowBusiness {
  public create = async (input: ShowInputDTO) => {
    const { token, week_day, start_time, end_time, band_id } = input;

    if (!token) {
      throw new RequestError("Token inválido!");
    }
    const payload = new Authenticator().getTokenPayload(token);

    if (!payload) {
      throw new RequestError("Usuário não encontrado");
    }

    if (payload) {
      throw new RequestError("Só administrador podem ter acesso");
    }

    const showDatabase = new ShowDatabase();
    const showAlreadyExist = await showDatabase.findShow(payload);

    if (showAlreadyExist) {
      throw new RequestError("Existe um show nesse dia");
    }
  };

  public getShows = async () => {
    const showDatabase = new ShowDatabase();

    const showsDB = await showDatabase.getShows();

    const response = {
      shows: showsDB,
    };
    return response;
  };

  public ticket = async (input: TicketInputDTO) => {
    const { token, showId } = input;

    if (!token) {
      throw new RequestError("Token inválido!");
    }
    const payload = new Authenticator().getTokenPayload(token);

    if (!payload) {
      throw new RequestError("Usuário não encontrado");
    }

    const showDatabase = new ShowDatabase();

    const showDB = await showDatabase.findShowId(showId);

    if (!showDB) {
      throw new RequestError("Show não encontrado");
    }
    const tickets = await showDatabase.getTicketsByShowId(showId);

    const isTicketAlreadyExist = await showDatabase.findTicket(
      showId,
      payload.id
    );

    if (isTicketAlreadyExist) {
      throw new RequestError(`Já comprou o ticket`);
    }
    const ticket: TicketDB = {
      id: new IdGenerator().generate(),
      show_id: showId,
      user_id: payload.id,
    };
    await showDatabase.createTicket(ticket);

    const response = {
      message: "Ticket comprado com sucesso",
    };
    return response;
  };
}
