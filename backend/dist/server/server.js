"use strict";
/**
 * @file server.ts
 * @description Configures and starts the GraphQL server with Apollo Server and Express.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const http_1 = __importDefault(require("http"));
const app_1 = require("./app");
const graphql_passport_1 = require("graphql-passport");
const database_1 = require("../database/database");
const User_1 = require("../database/models/User");
const resolvers_1 = require("../graphql/resolvers/resolvers");
const typeDefs_1 = require("../graphql/schema/typeDefs");
/**
 * @function startServer
 * @description Initializes and starts the GraphQL server.
 * @returns A promise that resolves when the server has started successfully.
 */
const startServer = async () => {
    const PORT = 4000;
    try {
        //Connect to database
        await (0, database_1.connectDB)();
        // Create Express application
        const app = (0, app_1.createApp)();
        // Create Apollo Server
        const server = new apollo_server_express_1.ApolloServer({
            persistedQueries: false,
            typeDefs: typeDefs_1.typeDefs,
            resolvers: resolvers_1.resolvers,
            context: ({ req, res }) => (0, graphql_passport_1.buildContext)({ req, res, User: User_1.User }),
        });
        // Create HTTP server
        const httpServer = http_1.default.createServer(app);
        // Start Apollo Server
        await server.start();
        // Apply middleware to Express app
        server.applyMiddleware({
            app,
            cors: false,
        });
        // Start HTTP server
        httpServer.listen(PORT, () => {
            console.log(`GraphQL endpoint running at http://localhost:${PORT}/graphql`);
        });
        // Handle shutdown process
        process.on('SIGINT', async () => {
            console.log('Shutting down server...');
            await (0, database_1.disconnectDB)();
            httpServer.close(() => {
                console.log('Server shut down gracefully');
            });
        });
    }
    catch (error) {
        console.error(`Error starting server: ${error}`);
    }
};
// Start the server
startServer()
    .then(() => {
    console.log('Server started!');
});
//# sourceMappingURL=server.js.map