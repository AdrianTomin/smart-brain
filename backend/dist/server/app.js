"use strict";
/**
 * @file app.ts
 * @description Configures and creates the Express application with middleware and routes.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const express_1 = __importStar(require("express"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const passport_1 = __importDefault(require("../utils/passport"));
/**
 * @function isAuthenticated
 * @description Middleware function to check if the user is authenticated.
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Express next function.
 * @returns Calls the next middleware function if user is authenticated, otherwise sends 401 Unauthorized.
 */
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).send({
        message: 'Unauthorized',
    });
};
/**
 * @function createApp
 * @description Creates and configures the Express application.
 * @returns Configured Express application.
 */
const createApp = () => {
    const PORT = Number.parseInt(process.env.PORT) || 4000;
    const app = (0, express_1.default)();
    //Session middleware
    app.use((0, express_session_1.default)({
        secret: process.env.JWT_SECRET,
        resave: false,
        saveUninitialized: false,
        store: connect_mongo_1.default.create({
            mongoUrl: process.env.MONGO_URI,
        }),
    }));
    //Passport middleware
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    // Parse incoming request bodies
    app.use((0, express_1.json)({
        limit: '50mb',
    }));
    app.use((0, express_1.urlencoded)({
        limit: '50mb',
        extended: true,
    }));
    const corsOptions = {
        origin: [
            'http://localhost:3000',
            'https://studio.apollographql.com',
            'https://smart-brain-project.vercel.app',
            'http://localhost:4000',
            'https://smart-brain-api-nine.vercel.app/graphql',
        ],
        credentials: true,
    };
    app.use((0, cors_1.default)(corsOptions));
    // Handle CORS preflight requests
    app.options('*', (0, cors_1.default)(corsOptions));
    //Parse JSON bodies
    app.use(express_1.default.json());
    /**
     * @description Endpoint to check if the user is authenticated.
     * If authenticated, responds with status 200 and message 'Authenticated'.
     * Otherwise, responds with status 401 Unauthorized.
     */
    app.post('/check-auth', isAuthenticated, (_req, res) => {
        res.status(200).send({
            message: 'Authenticated',
        });
    });
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
    return app;
};
exports.createApp = createApp;
//# sourceMappingURL=app.js.map