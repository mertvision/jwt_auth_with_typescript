/**
 * UserInterface.ts
 * User Interface
 * 
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

import {Document} from 'mongoose';

// Define the structure of a User document
export interface IUser extends Document {
    first_name: string;     // User's first name
    last_name: string;      // User's last name
    email: string;          // User's email address
    role?: 'user' | 'admin'; // Optional field for user role, default is 'user'
    password: string;       // User's password
    createdAt?: Date;       // Optional field for the date when the user was created
    title?: string;         // Optional field for user's title
    about?: string;         // Optional field for additional information about the user
    place?: string;         // Optional field for user's location
    website?: string;       // Optional field for user's website URL
    profile_image?: string; // Optional field for the URL of the user's profile image
    blocked?: boolean;      // Optional field indicating whether the user is blocked
};