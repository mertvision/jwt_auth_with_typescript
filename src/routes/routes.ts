/**
 * routes.ts
 * Server routes declaration
 * 
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Import Statement of Third Party Libraries
import express from "express"; // Import statement of "express" module
// Import Statement of Our Libraries 
import authRouter from "./auth/auth_routes";

// Create a new router instance
const router = express.Router();

// Use the authRouter for the auth routes
router.use('/auth', authRouter);

// Export the router instance
export default router;
