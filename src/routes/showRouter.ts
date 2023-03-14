import { Router } from "express";
//import express from "express";
import ShowController from "../controller/ShowController";


export const showRouter = Router();

const showController = new ShowController();

showRouter.post("/create", showController.create);
showRouter.get("shows", showController.getShows);
showRouter.post("/ticket/:id", showController.ticket)
