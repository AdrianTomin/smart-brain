/**
 * @file server.ts
 * @description Configures and starts the GraphQL server with Apollo Server and Express.
 */

import { ApolloServer } from 'apollo-server-express';

import http from 'http';

import { createApp } from '@/server/app';
import { buildContext } from 'graphql-passport';
import { connectDB, disconnectDB } from '@/database/database';
import { User } from '@/database/models/User';
import { resolvers } from '@/graphql/resolvers/resolvers';
import { typeDefs } from '@/graphql/schema/typeDefs';


/**
 * @function startServer
 * @description Initializes and starts the GraphQL server.
 * @returns A promise that resolves when the server has started successfully.
 */
const startServer = async (): Promise<void> => {
	const PORT: number = 4000;

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
			context: ({ req, res }) => buildContext({ req, res, User }),
		});

		// Create HTTP server
		const httpServer = http.createServer(app);

		// Start Apollo Server
		await server.start();

		// Apply middleware to Express app
		server.applyMiddleware({
			app,
			cors: false,
		});

		// Start HTTP server
		httpServer.listen(PORT, (): void => {
			console.log(`GraphQL endpoint running at http://localhost:${PORT}/graphql`);
		});

		// Handle shutdown process
		process.on('SIGINT', async (): Promise<void> => {
			console.log('Shutting down server...');
			await disconnectDB();
			httpServer.close((): void => {
				console.log('Server shut down gracefully');
			});
		});

	} catch (error) {
		console.error(`Error starting server: ${error}`);
	}
};

// Start the server
await startServer();