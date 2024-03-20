"use strict";
/**
 * @file passport.ts
 * @description Configures authentication strategies using Passport.js and bcrypt for password hashing.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePasswords = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const graphql_passport_1 = require("graphql-passport");
const passport_1 = __importDefault(require("passport"));
const User_1 = require("../database/models/User");
/**
 * @description Initializes authentication strategies.
 */
passport_1.default.use(new graphql_passport_1.GraphQLLocalStrategy(async (email, password, done) => {
    try {
        const user = await User_1.User.findOne({ email });
        if (!user) {
            return done(null, false, {
                info: false,
                message: 'Incorrect username.'
            });
        }
        const isValidPassword = await (0, exports.comparePasswords)(password, user.password);
        if (!isValidPassword) {
            return done(null, false, {
                info: false,
                message: 'Incorrect password.'
            });
        }
        return done(null, user);
    }
    catch (error) {
        return done(error);
    }
}));
/**
 * @description Serializes user object to store in the session.
 */
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
/**
 * @description Deserializes user object from the session.
 */
passport_1.default.deserializeUser(async (id, done) => {
    try {
        const user = await User_1.User.findById(id);
        if (!user) {
            return done(null, null);
        }
        done(null, user);
    }
    catch (error) {
        done(error);
    }
});
/**
 * @function hashPassword
 * @description Hashes the provided password using bcrypt.
 * @param password - The password to hash.
 * @returns A promise resolving to the hashed password.
 */
const hashPassword = async (password) => {
    try {
        return await bcrypt_1.default.hash(password, 10);
    }
    catch (error) {
        throw new Error('Error hashing password');
    }
};
exports.hashPassword = hashPassword;
/**
 * @function comparePasswords
 * @description Compares the entered password with the stored hashed password.
 * @param enteredPassword - The password entered by the user.
 * @param storedPasswordHash - The stored hashed password.
 * @returns A promise resolving to true if passwords match, false otherwise.
 */
const comparePasswords = async (enteredPassword, storedPasswordHash) => {
    try {
        return await bcrypt_1.default.compare(enteredPassword, storedPasswordHash);
    }
    catch (error) {
        throw new Error('Incorrect Credentials');
    }
};
exports.comparePasswords = comparePasswords;
exports.default = passport_1.default;
//# sourceMappingURL=passport.js.map