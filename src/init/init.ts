/**
 * init.ts
 * The file containing the 'init' function that starts the Express server
 * 
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Define an interface for process environment variables (process.env için bir arayüz, ? işareti özelliklerin isteğe bağımlı olduğunu belirtir)
interface ProcessEnv {
    SERVER_PROTOCOL?: string; // Optional string for the protocol (e.g., 'http' or 'https')
    SERVER_HOST?: string;     // Optional string for the host (e.g., 'localhost')
    SERVER_PORT?: string;     // Optional string for the port (e.g., '3000')
};

import {Request, Response} from "express";

// Initialize the server with environment variables
const init = (server: any): void => {
    try {
        // Cast process.env to the custom ProcessEnv interface
        const env = process.env as unknown as ProcessEnv;

        // Extract environment variables
        const SERVER_PROTOCOL = env.SERVER_PROTOCOL;
        const SERVER_HOST = env.SERVER_HOST;
        const SERVER_PORT = env.SERVER_PORT;

        // Create a server address string from the environment variables
        const serverAddress = `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}`;
        const callbackMessage = `Server is running on ${serverAddress}`;

        // Start the server and log a message once it's listening
        server.listen(SERVER_PORT, () => {
            console.log(callbackMessage); // Log the server address
        });

        server.get('/', (req: Request, res:Response)=> {res.write("hello")});
    }
    catch (err) {
        // Handle any errors that occur during initialization
        console.error('Error initializing server:', err);
    };
};

export default init;
