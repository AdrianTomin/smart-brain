/**
 * @file UserResolvers.ts
 * @description Defines resolver functions for user-related GraphQL queries and mutations.
 */

import { User } from '@/database/models/User';
import { comparePasswords, hashPassword } from '@/utils/passport';

/**
 * @interface UserSignup
 * @description Represents the shape of user signup input data.
 */
interface UserSignup {
	firstName: string;
	email: string;
	password: string;
}

/**
 * @interface UserLogout
 * @description Represents the shape of user logout input data.
 */
interface UserLogout {
	email: string;
}

/**
 * @interface UserDeleteAccount
 * @description Represents the shape of user delete account input data.
 */
interface UserDeleteAccount {
	email: string;
	password: string;
}

/**
 * @interface IncrementEntries
 * @description Represents the shape of input data for incrementing user entries.
 */
interface IncrementEntries {
	email: string;
}

/**
 * @namespace UserQueries
 * @description Contains resolver functions for user-related GraphQL queries.
 */
export const UserQueries = {

	/**
	 * @async
	 * @function getCurrentUser
	 * @description Retrieves the currently authenticated user.
	 * @param {unknown} _parent - Parent resolver object.
	 * @param {unknown} _args - Resolver arguments.
	 * @param {any} context - Context object containing authentication information.
	 * @returns {Promise<any>} The currently authenticated user.
	 */
	async getCurrentUser(_parent: unknown, _args: unknown, context: any): Promise<any> {
		return await context.getUser();
	},
};

/**
 * @namespace UserMutations
 * @description Contains resolver functions for user-related GraphQL mutations.
 */
export const UserMutations = {

	/**
	 * @async
	 * @function signup
	 * @description Registers a new user account.
	 * @param {unknown} _parent - Parent resolver object.
	 * @param {UserSignup} args - User signup input data.
	 * @returns {Promise<any>} The newly created user object.
	 */
	async signup(_parent: unknown, args: UserSignup): Promise<any> {
		const { firstName, email, password } = args;
		const lowerCaseEmail = email.toLowerCase();

		if (password.length < 8) {
			throw new Error('Password length must be at least 8 characters');
		}

		if (!lowerCaseEmail.includes('@')) {
			throw new Error('Email has an invalid format.');
		}

		const oldUser = await User.findOne({ email: lowerCaseEmail });
		if (oldUser) {
			throw new Error('An account with this email already exists.');
		}

		const hashedPassword = await hashPassword(password);

		const newUser = new User({
			firstName: firstName,
			email: lowerCaseEmail,
			password: hashedPassword,
			entries: 0,
			dateJoined: Date.now(),
			isActive: true,
			isLoggedIn: true,
		});

		return await newUser.save();
	},

	/**
	 * @async
	 * @function login
	 * @description Authenticates a user and logs them in.
	 * @param {any} _parent - Parent resolver object.
	 * @param {any} args - User login input data.
	 * @param {any} context - Context object containing authentication utilities.
	 * @returns {Promise<any>} The authenticated user object.
	 */
	async login(_parent: any, { email, password }: any, context: any): Promise<any> {
		const lowerCaseEmail = email.toLowerCase();
		const { user } = await context.authenticate('graphql-local', {
			email: lowerCaseEmail,
			password,
		});

		const isValidPassword = await comparePasswords(password, user.password);

		if (!isValidPassword || !lowerCaseEmail) {
			throw new Error('Incorrect Credentials');
		}

		if (!user.isActive) {
			throw new Error('Account is not active.');
		}

		user.isLoggedIn = true;
		await context.login(user);

		return await user.save();
	},

	/**
	 * @async
	 * @function logout
	 * @description Logs out a user.
	 * @param {unknown} _parent - Parent resolver object.
	 * @param {UserLogout} args - User logout input data.
	 * @returns {Promise<any>} The updated user object after logout.
	 */
	async logout(_parent: unknown, args: UserLogout): Promise<any> {
		const { email } = args;
		const lowerCaseEmail = email.toLowerCase();
		const user = await User.findOne({
			email: lowerCaseEmail,
		});

		if (!user) {
			throw new Error('User not found');
		}

		user.isLoggedIn = false;
		return await user.save();
	},

	/**
	 * @async
	 * @function deleteUserAccount
	 * @description Deletes a user account.
	 * @param {unknown} _parent - Parent resolver object.
	 * @param {UserDeleteAccount} args - User delete account input data.
	 * @returns {Promise<any>} The deleted user object.
	 */
	async deleteUserAccount(_parent: unknown, args: UserDeleteAccount): Promise<any> {
		const { email } = args;
		const lowerCaseEmail = email.toLowerCase();

		const user = await User.findOne({
			email: lowerCaseEmail,
		});

		if (!user) {
			throw new Error('User does not exist');
		}

		const deletedUser = User.findOneAndDelete({
			email: lowerCaseEmail,
		});

		if (!deletedUser) {
			throw new Error('Failed to delete user');
		}

		return deletedUser;
	},

	/**
	 * @async
	 * @function incrementUserEntries
	 * @description Increments the entry count for a user.
	 * @param {any} _parent - Parent resolver object.
	 * @param {IncrementEntries} args - Input data for incrementing user entries.
	 * @returns {Promise<any>} The updated user object with incremented entries.
	 */
	async incrementUserEntries(_parent: any, args: IncrementEntries): Promise<any> {

		const { email } = args;
		const lowerCaseEmail = email.toLowerCase();

		const currentUser = await User.findOne({
			email: lowerCaseEmail,
		});

		if (!currentUser) {
			throw new Error('User not found');
		}

		currentUser.entries += 1;
		await currentUser.save();

		return currentUser;
	},
};