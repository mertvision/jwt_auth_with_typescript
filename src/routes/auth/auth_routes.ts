/**
 * auth.ts
 * Auth routes declaration
 * 
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Import Statement of Third Party Libraries
import express from "express"; // Import statement of "express" module
// Import Statement of Our Libraries
import {register, login, getMe, logout} from "../../controllers/auth_controllers"; // Import statement of auth routes controllers
import {getAccessToRoute} from "../../middlewares/jwt/jwt_middlewares"; // Import statement of JWT middleware

// Create a authRouter as router instance
const authRouter = express.Router();

// Auth routes
authRouter.post('/login', login); // Login route
authRouter.post('/register', register); // Register route
authRouter.post('/me', getAccessToRoute, getMe); // Me route
authRouter.get('/logout', getAccessToRoute, logout); // Logout route

// Export the authRouter 
export default authRouter;