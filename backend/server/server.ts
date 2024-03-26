/**
 * @file server.ts
 * @description Configures and starts the GraphQL server with Apollo Server and Express.
 */

import { ApolloServer } from 'apollo-server-express';

import http from 'http';

import { createApp } from './app';
import { buildContext } from 'graphql-passport';
import { connectDB, disconnectDB } from '../database/database';
import { User } from '../database/models/User';
import { resolvers } from '../graphql/resolvers/resolvers';
import { typeDefs } from '../graphql/schema/typeDefs';

const PORT = Number.parseInt(process.env.PORT) || 4000;

/**
 * @function startServer
 * @description Initializes and starts the GraphQL server.
 * @returns A promise that resolves when the server has started successfully.
 */
const startServer = async (): Promise<void> => {

	try {
		//Connect to database
		await connectDB();

		// Create Express application
		const app = createApp();

		// Create Apollo Server
		const server = new ApolloServer({
			persistedQueries: false,
			typeDefs,
			resolvers,
			introspection: true,
			context: ({ req, res }) => buildContext({ req, res, User } as any),
		});

		// Start Apollo Server
		await server.start();

		// Apply middleware to Express app
		server.applyMiddleware({
			app,
			cors: false,
		});

	} catch (error) {
		console.error(`Error starting server: ${error}`);
	}
};

// Start the server
startServer()
	.then(() => {
		console.log(`Server started on port ${PORT}!`);
	});