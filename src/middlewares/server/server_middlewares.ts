import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import router from "../../routes/routes";
import customErrorHandler from "../handler/handler";

const initServerMiddlewares = (server: any):void => {
       server.use(express.json());
       server.use('/api', router);
       server.use(customErrorHandler);
       server.use(helmet());
       server.use(morgan('combined'));
};

export default initServerMiddlewares;