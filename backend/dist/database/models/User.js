"use strict";
/**
 * @file User.ts
 * @description Defines the Mongoose model for the user entity in the application.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
/**
 * @constant UserSchema
 * @description Defines the schema for the user document.
 */
const UserSchema = new mongoose_1.Schema({
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
exports.User = mongoose_1.default.model('User', UserSchema);
//# sourceMappingURL=User.js.map