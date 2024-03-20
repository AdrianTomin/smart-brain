"use strict";
/**
 * @file database.ts
 * @description Handles database connection and disconnection using Mongoose.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDB = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
/**
 * @constant backendPath
 * @description Absolute path of the backend directory.
 */
const backendPath = path_1.default.resolve(__dirname, '../');
// Load environment variables from the .env file in the backend directory
dotenv_1.default.config({ path: path_1.default.join(backendPath, '.env') });
const uri = process.env.MONGO_URI;
/**
 * @async
 * @function connectDB
 * @description Establishes a connection to the MongoDB database using Mongoose.
 * @returns {Promise<void>}
 */
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(uri, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log('Connected to MongoDB using Mongoose!');
        mongoose_1.default.connection.once('connected', () => {
            console.log('Mongoose default connection is open');
        });
        mongoose_1.default.connection.on('error', (error) => {
            console.error('Mongoose default connection error:', error);
        });
        mongoose_1.default.connection.on('disconnected', () => {
            console.log('Mongoose default connection is disconnected');
        });
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw new Error('Database connection failed');
    }
};
exports.connectDB = connectDB;
/**
 * @async
 * @function disconnectDB
 * @description Closes the connection to the MongoDB database using Mongoose.
 * @returns {Promise<void>}
 */
const disconnectDB = async () => {
    try {
        await mongoose_1.default.disconnect();
        console.log('Disconnected from MongoDB!');
    }
    catch (error) {
        console.error('Error disconnecting from MongoDB:', error);
        throw new Error('Database disconnection failed');
    }
};
exports.disconnectDB = disconnectDB;
//# sourceMappingURL=database.js.map