"use strict";
/**
 * @file resolvers.ts
 * @description Defines GraphQL resolver functions by combining user queries and mutations.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const UserResolvers_1 = require("./UserResolvers");
/**
 * @constant resolvers
 * @description Combines user queries and mutations to form the overall GraphQL resolvers.
 */
exports.resolvers = {
    Query: {
        /**
         * @description Contains resolver functions for user-related GraphQL queries.
         */
        ...UserResolvers_1.UserQueries,
    },
    Mutation: {
        /**
         * @description Contains resolver functions for user-related GraphQL mutations.
         */
        ...UserResolvers_1.UserMutations,
    },
};
//# sourceMappingURL=resolvers.js.map