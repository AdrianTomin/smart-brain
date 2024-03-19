/**
 * @file app.ts
 * @description Configures and creates the Express application with middleware and routes.
 */

import cors from 'cors';
import session from 'express-session';
import express, { NextFunction } from 'express';
import helmet from 'helmet';

import passport from '@/utils/passport';

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
	res.status(401).send({ message: 'Unauthorized' });
};

/**
 * @function createApp
 * @description Creates and configures the Express application.
 * @returns Configured Express application.
 */
export const createApp = () => {

	const app = express();

	//Session middleware
	app.use(session({
		secret: 'smart-brain-secret',
		resave: false,
		saveUninitialized: true,
	}));

	//Passport middleware
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(helmet());

	const corsOptions = {
		origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
		credentials: true,
	};

	app.use(cors(corsOptions));

	//Parse JSON bodies
	app.use(express.json());

	/**
	 * @description Endpoint to check if the user is authenticated.
	 * If authenticated, responds with status 200 and message 'Authenticated'.
	 * Otherwise, responds with status 401 Unauthorized.
	 */
	app.post('/check-auth', isAuthenticated, (_req, res): void => {
		console.log('check-auth route hit with POST method');
		res.status(200).send({
			message: 'Authenticated',
		});
	});

	return app;
};