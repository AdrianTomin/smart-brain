/**
 * @file passport.ts
 * @description Configures authentication strategies using Passport.js and bcrypt for password hashing.
 */

import bcrypt from 'bcrypt';
import { GraphQLLocalStrategy } from 'graphql-passport';
import passport from 'passport';

import { User } from '@/database/models/User';

/**
 * @description Initializes authentication strategies.
 */
passport.use(new GraphQLLocalStrategy(async (email: any, password: any, done): Promise<void> => {
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return done(null, false, {
				info: false,
				message: 'Incorrect username.'
			});
		}
		const isValidPassword = await comparePasswords(password, user.password);
		if (!isValidPassword) {
			return done(null, false, {
				info: false,
				message: 'Incorrect password.'
			});
		}
		return done(null, user);
	} catch (error) {
		return done(error);
	}
}));

/**
 * @description Serializes user object to store in the session.
 */
passport.serializeUser((user: any, done): void => {
	done(null, user.id);
});

/**
 * @description Deserializes user object from the session.
 */
passport.deserializeUser(async (id: string, done): Promise<void> => {
	try {
		const user = await User.findById(id);
		if (!user) {
			return done(null, null);
		}
		done(null, user);
	} catch (error) {
		done(error);
	}
});

/**
 * @function hashPassword
 * @description Hashes the provided password using bcrypt.
 * @param password - The password to hash.
 * @returns A promise resolving to the hashed password.
 */
export const hashPassword = async (password: string): Promise<string> => {
	try {
		return await bcrypt.hash(password, 10);
	} catch (error) {
		throw new Error('Error hashing password');
	}
};

/**
 * @function comparePasswords
 * @description Compares the entered password with the stored hashed password.
 * @param enteredPassword - The password entered by the user.
 * @param storedPasswordHash - The stored hashed password.
 * @returns A promise resolving to true if passwords match, false otherwise.
 */
export const comparePasswords = async (enteredPassword: string, storedPasswordHash: string): Promise<boolean> => {
	try {
		return await bcrypt.compare(enteredPassword, storedPasswordHash);
	} catch (error) {
		throw new Error('Incorrect Credentials');
	}
};

export default passport;