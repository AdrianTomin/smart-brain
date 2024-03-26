/**
 * @file app.ts
 * @description Configures and creates the Express application with middleware and routes.
 */

import cors from 'cors';
import session from 'express-session';
import express, { json, NextFunction, urlencoded } from 'express';

import MongoStore from 'connect-mongo';

import passport from '../utils/passport';
import { randomUUID } from 'crypto';

/**
 * @function isAuthenticated
 * @description Middleware function to check if the user is authenticated.
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Express next function.
 * @returns Calls the next middleware function if user is authenticated, otherwise sends 401 Unauthorized.
 */
const isAuthenticated = (req: any, res: express.Response, next: NextFunction) => {
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
export const createApp = () => {
	const PORT = Number.parseInt(process.env.PORT) || 4000;
	const app = express();

	//Session middleware
	app.use(session({
			name: 'my-cookie',
			secret: process.env.JWT_SECRET as string,
			resave: false,
			saveUninitialized: true,
			store: MongoStore.create({
				mongoUrl: process.env.MONGO_URI,
			}),
			cookie: {
				maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds,
				sameSite: 'none',
				secure: true
			},
		}),
	);

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

	app.use(cors(corsOptions));

	//Passport middleware
	app.use(passport.initialize());
	app.use(passport.session());

	// Parse incoming request bodies
	app.use(json({
		limit: '50mb',
	}));

	app.use(urlencoded({
		limit: '50mb',
		extended: true,
	}));


	// Handle CORS preflight requests
	app.options('*', cors(corsOptions));

	//Parse JSON bodies
	app.use(express.json());

	/**
	 * @description Endpoint to check if the user is authenticated.
	 * If authenticated, responds with status 200 and message 'Authenticated'.
	 * Otherwise, responds with status 401 Unauthorized.
	 */
	app.post('/check-auth', isAuthenticated, (_req, res): void => {
		res.status(200).send({
			message: 'Authenticated',
		});
	});

	app.listen(PORT, () => {
		console.log(`Server listening on port ${PORT}`);
	});
	return app;
};