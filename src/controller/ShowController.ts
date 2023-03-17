import { Request, Response } from "express";
import { ShowBusiness } from "../business/ShowBusiness";
import { ShowInputDTO, TicketInputDTO } from "../model/Show";

export class ShowController {
  public create = async (req: Request, res: Response) => {
    try {
      const input: ShowInputDTO = {
        token: req.headers.authorization as string,
        week_day: req.body.week_day,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        band_id: req.body.band_id,
      };
      const showBusiness = new ShowBusiness();

      const response = await showBusiness.create(input);

      res.status(201).send(response);
    } catch (error: any) {
      res.status(error.statusCode || 500).send({ message: error.message });
    }
  };
  public getShows = async (req: Request, res: Response) => {
    try {
      const showBusiness = new ShowBusiness();

      const response = await showBusiness.getShows();

      res.status(201).send(response);
    } catch (error: any) {
      res.status(error.statusCode || 500).send({ message: error.message });
    }
  };
  public ticket = async (req: Request, res: Response) => {
    try {
      const input: TicketInputDTO = {
        token: req.headers.authorization as string,
        showId: req.params.id,
      };
      const showBusiness = new ShowBusiness();

      const response = await showBusiness.ticket(input);

      res.status(201).send(response);
    } catch (error: any) {
      res.status(error.statusCode || 500).send({ message: error.message });
    }
  };
}


