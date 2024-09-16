/**
 * UserSchema.ts
 * 
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

import mongoose, {Schema} from 'mongoose';
import {IUser} from '../../interfaces/user/UserInterface';

// Define the User schema
const UserSchema: Schema<IUser> = new Schema({
    first_name: {
        type: String,
        required: [true, 'Please provide a first name'] // Ensures first name is provided
    },
    last_name: {
        type: String,
        required: [true, 'Please provide a last name'] // Ensures last name is provided
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures email is unique
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            'Please provide a valid e-mail' // Validates email format
        ]
    },
    role: {
        type: String,
        default: 'user', // Default role is 'user'
        enum: ['user', 'admin'] // Allows only 'user' or 'admin' values
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'], // Ensures password is provided
        minlength: [6, 'Please provide a password longer than 6 characters'], // Validates password length
        select: false // Password is not included in query results by default
    },
    createdAt: {
        type: Date,
        default: Date.now // Sets the default value to the current date
    },
    title: {
        type: String // Optional field for title
    },
    about: {
        type: String // Optional field for additional information
    },
    place: {
        type: String // Optional field for location
    },
    website: {
        type: String // Optional field for website URL
    },
    profile_image: {
        type: String,
        default: 'default.jpg' // Default profile image
    },
    blocked: {
        type: Boolean,
        default: false // Default value for blocked status
    }
});

// Create the User model and export it
const User = mongoose.model<IUser>('User', UserSchema);

export default User;
