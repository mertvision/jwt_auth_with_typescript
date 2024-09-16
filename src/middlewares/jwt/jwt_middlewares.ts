/**
 * jwt_middlewares.ts
 * Middleware functions for JWT
 * 
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Import Statement of Third Party Libraries
import jwt from "jsonwebtoken";
import {Request, Response, NextFunction} from "express";
// Import Statement of Our Libraries
import JWTLib from "../../lib/jwt/jwt";
import CustomError from "../../lib/error/CustomError";
import { DecodedTokenInterface } from "../../interfaces/jwt/jwt_interface";

export const getAccessToRoute = async (req: Request, res: Response, next: NextFunction) => {
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string; // Ensure JWT_SECRET_KEY is a string

    if (!JWTLib._checkTokenInclude(req)) {
        // If not, return a 401 Unauthorized error
        return next(new CustomError("You are not authorized", 401));
    }

    try {
        const accessToken = await JWTLib._getAccessTokenFromHeader(req); // Await the promise if it's asynchronous

        if (!accessToken) {
            return next(new CustomError("Please provide an access token", 400));
        }

        jwt.verify(accessToken, JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                return next(new CustomError('You are not authorized', 401)); // Handle verification failure
            }

            const decodedToken = decoded as DecodedTokenInterface; // Cast the decoded object to DecodedToken interface

            req.user = {
                id: decodedToken.id, // User ID from the token
                first_name: decodedToken.first_name // User name from the token
            };

            console.log(decodedToken); // Log the decoded token for debugging purposes

            next(); // Pass control to the next middleware function
        });
    } catch (error) {
        return next(new CustomError("Error processing token", 500)); // Handle errors in fetching the token
    }
};

