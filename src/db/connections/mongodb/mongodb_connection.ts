/**
 * mongodb_connection.ts
 * A class and its methods for performing the connection process to MongoDB
 * 
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// Import Statement of Third Party Modules 
import mongoose, {ConnectOptions} from "mongoose"; // Import statement of "mongoose" module

// Define a class for managing MongoDB connections
class MongodbConnection {
    // Private constructor to prevent instantiation
    private constructor(){};

    // Static method to connect to MongoDB
    static async _connectMongoDb(): Promise<void> {
        try {
            // Attempt to connect to MongoDB using the connection URI from environment variables
            // If process.env.MONGO_URI is not defined, an empty string is used as a fallback
            await mongoose.connect(process.env.MONGO_URI || '', {
                dbName: 'jwt' // Specify the database name to connect to
            } as ConnectOptions);
            // Log a success message if the connection is successful
            console.log("MongoDB connection is successful.");
        } catch (err) {
            // Log an error message if the connection fails
            console.log('MongoDB connection error', err);
        };
    };
};

// Export the MongodbConnection class as the default export of this module
export default MongodbConnection;
