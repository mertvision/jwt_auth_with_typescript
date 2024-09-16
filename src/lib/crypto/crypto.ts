/**
 * crypto.ts
 * CryptoLib for crypto operations
 * 
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

import bcrypt from "bcrypt"; // bcrypt module for crypto
import { NextFunction } from "express";

class CryptoLib {
    private password?: string; // Stores a password if provided (optional)

    // Constructor method for initializing the CrpytoLib instance
    constructor(password?: string) {
        this.password = password; // Optional: stores a password if provided
    };

    async hashUserPassword(password: string, next: NextFunction) {
        try {
            // Generate a salt with 10 rounds of processing
            const salt = await bcrypt.genSalt(10);
            // Hash the password with the generated salt
            const hashedPassword = await bcrypt.hash(password, salt);
            // Return the hashed password
            return hashedPassword;
        }
        catch (err) {
            next(err);;
        };
    };

    // Static method to compare a plain password with a hashed password

     async comparePassword(password: string, hashedPassword: string, next: NextFunction) {
        try {
            // Compare the plain password with the hashed password
            return bcrypt.compare(password, hashedPassword)
        }
        catch (err) {
             next(err);
        }
    };
};

// Export the CryptoUtils class for use in other modules
export default CryptoLib;