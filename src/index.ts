/**
 * index.ts
 * Main file of this project
 * 
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Import statements for third-party modules (from npm)
import express from "express";
// Import statements for our modules (with configuration functions)
import initServerConfigurations from "./config/config";
import initServerMiddlewares from "./middlewares/server/server_middlewares";
import init from "./init/init";
// Import statements of database connections modules (postgresql, mongodb, redis etc)
import MongodbConnection from "./db/connections/mongodb/mongodb_connection";

// Server variable declaration and value assigment
const server = express();

// Invoke initialization modules
initServerConfigurations();
initServerMiddlewares(server);

// MongoDB Connection Module (If you have one, it should be initialized here)
MongodbConnection._connectMongoDb();

// Invocation initialization of the server module
init(server);

// Declaration
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        first_name: string;
      };
    }
  }
};

