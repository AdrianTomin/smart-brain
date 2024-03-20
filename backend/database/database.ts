/**
 * @file database.ts
 * @description Handles database connection and disconnection using Mongoose.
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

/**
 * @constant backendPath
 * @description Absolute path of the backend directory.
 */
const backendPath = path.resolve(__dirname, '../');

// Load environment variables from the .env file in the backend directory
dotenv.config({ path: path.join(backendPath, '.env') });

const uri = process.env.MONGO_URI as string;

/**
 * @async
 * @function connectDB
 * @description Establishes a connection to the MongoDB database using Mongoose.
 * @returns {Promise<void>}
 */
export const connectDB = async (): Promise<void> => {
	try {
		await mongoose.connect(uri, {
			serverSelectionTimeoutMS: 5000,
		});

		console.log('Connected to MongoDB using Mongoose!');

		mongoose.connection.once('connected', () => {
			console.log('Mongoose default connection is open');
		});

		mongoose.connection.on('error', (error: any) => {
			console.error('Mongoose default connection error:', error);
		});

		mongoose.connection.on('disconnected', () => {
			console.log('Mongoose default connection is disconnected');
		});
	} catch (error) {
		console.error('Error connecting to MongoDB:', error);
		throw new Error('Database connection failed');
	}
};

/**
 * @async
 * @function disconnectDB
 * @description Closes the connection to the MongoDB database using Mongoose.
 * @returns {Promise<void>}
 */
export const disconnectDB = async (): Promise<void> => {
	try {
		await mongoose.disconnect();
		console.log('Disconnected from MongoDB!');
	} catch (error) {
		console.error('Error disconnecting from MongoDB:', error);
		throw new Error('Database disconnection failed');
	}
};