/**
 * jwt.ts
 * JWT (Json Web Token) Library Class
 * 
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

import {Request, Response} from "express"; // Request and Response types in Express
import jwt from "jsonwebtoken"; // Jsonwebtoken module

// JWT library class for handling JSON Web Token Operations
class JWTLib{
    constructor(){};

    // Static method to send a JSON Web Token to the client
    static _sendJwtToClient(user: any, res: Response): Response{

        // Retrieve configuration values from environment variables
        const JWT_SECRET_KEY=process?.env?.JWT_SECRET_KEY as string; // Secret key for signing the JWT
        const JWT_EXPIRE=process?.env?.JWT_EXPIRE as string; // Expiration time for the JWT
        const JWT_COOKIE_EXPIRE=process?.env?.JWT_COOKIE_EXPIRE as string; // Current environment (e.g., development or production)
        const NODE_ENV=process?.env?.NODE_ENV as string; // Node environment variable

        // Create the payload for the JWT
        const payload = {
            id: user.id, // User id
            first_name: user.first_name, // User first name
        };

        // Sign the JWT with the payload and secret key
        const token = jwt.sign(payload, JWT_SECRET_KEY, {
            expiresIn: JWT_EXPIRE
        });

        // Send the JWT to the client in a cookie and as part of the response JSON
        return res.status(200) // Set HTTP status code to OK (200)
        .cookie("access_token", token, {
            httpOnly: true, // Cookie is not accessible via JavaScript (client-side)
            expires: new Date(Date.now() + parseInt(JWT_COOKIE_EXPIRE)), // Set cookie expiration time
            secure: NODE_ENV === 'development' ? false : true, // Use secure flag based on environment
        })
        .json({
            success: true, // Indicates the request was successful.
            access_token: token, // Return the JWT as part of the response,
            data: {
                id: user.id,
                first_name: user.first_name,
            }
        });
    };

    // Static method to check if the token is included in the request headers
    static async _checkTokenInclude(req: Request): Promise<boolean> {
      // Check if the authorization header is present and starts with "Bearer:"
      const authorization = req.headers.authorization;
      return authorization ? authorization.startsWith("Bearer:") : false;
    };

    // Static method to extract the access token from the request headers
    static async _getAccessTokenFromHeader(req: Request): Promise<string | undefined> {
        const authorization = req.headers.authorization; // Get the authorization header
        if (authorization) {
            const access_token = authorization.split(" ")[1]; // Extract the token from "Bearer <token>"
            return access_token;
        }
        return undefined; // Return undefined if authorization header is not present
    }
};

export default JWTLib;