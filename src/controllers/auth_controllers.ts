/** 
 * auth_controllers.ts
 * Auth controllers functions
 * 
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
*/

// Import Statement of Third Party Libraries
import {Request, Response, NextFunction} from "express";
// Import Statement of Our Libraries
import CryptoLib from "../lib/crypto/crypto"; // Crypto Library Class
import JWTLib from "../lib/jwt/jwt"; // JWT Library Class
import CustomError from "../lib/error/CustomError"; // Custom Error
import User from "../db/models/UserSchema"; // User Schema

// Asynchronous function to handle user registration
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    // Extracting user details from the request body
    const {first_name, last_name, email, password} = req.body;

    if (!first_name || !last_name || !email || !password) {
      return next(new CustomError('Please provide all required fields', 400));
    };

    // Creating an instance of CryptoLib to handle password encryption
    const crpytoLib = new CryptoLib();

    // Hashing the user password
    const hashedPassword = await crpytoLib.hashUserPassword(password, next);

    const user = await User.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: hashedPassword,
    });

    // Generating and sending a JSON Web Token (JWT) to the client
    JWTLib._sendJwtToClient(user, res);
  }
  catch(err){
    next(err);
  };
};

// Asynchronous function to handle user login
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
      const { email, password } = req.body;

      if (!email || !password) {
          return next(new CustomError('Please provide login inputs', 400));
      }

      const user = await User.findOne({ email }).select('+password');

      if (!user) {
          return next(new CustomError('User could not be found', 400));
      };

      const cryptoLib = new CryptoLib();

      const userPassword = user.password as string;

      if (!cryptoLib.comparePassword(password, userPassword, next)) {
          return next(new CustomError('Password is incorrect', 400));
      }

      JWTLib._sendJwtToClient(user, res);
  } catch (err) {
      return next(err);
  }
};

// Asynchronous function to handle retrieving the current user's information
export const getMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
       res.status(200).json({
          success: true,
          data: {
              id: req.user?.id,
              name: req.user?.first_name
          }
      });
  } catch (err) {
      return next(err);
  }
};

// Asynchronous function to handle user logout
export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.clearCookie('access_token'); // Clear the cookie named 'access_token'
    
    // Send JSON response
    res.status(200).json({
      success: true,
      message: 'You have been logged out.'
    });
    
  } catch (err) {
    // Pass any errors to the next middleware or error handler
    next(err);
  }
};
