/**
 * @file User.ts
 * @description Defines the Mongoose model for the user entity in the application.
 */

import mongoose, {
	Document,
	Model,
	Schema,
} from 'mongoose';

/**
 * @interface UserInterface
 * @description Defines the structure of the user document in MongoDB.
 * @extends Document
 */
export interface UserInterface extends Document {
	firstName: string;
	email: string;
	password: string;
	isActive: boolean;
	isLoggedIn?: boolean;
	entries: number;
	dateJoined?: Date;
}

/**
 * @constant UserSchema
 * @description Defines the schema for the user document.
 */
const UserSchema = new Schema<UserInterface>({
	firstName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	isActive: {
		type: Boolean,
		required: true,
		default: false,
	},
	isLoggedIn: {
		type: Boolean,
		required: false,
		default: false,
	},
	entries: {
		type: Number,
		required: true,
		default: 0,
	},
	dateJoined: {
		type: Date,
		default: Date.now(),
	},
});

/**
 * @constant User
 * @description Represents the Mongoose model for the User collection.
 * @type {Model<UserInterface>}
 */
export const User: Model<UserInterface> = mongoose.model('User', UserSchema);