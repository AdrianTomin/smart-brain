/**
 * @file resolvers.ts
 * @description Defines GraphQL resolver functions by combining user queries and mutations.
 */

import { UserQueries, UserMutations } from './UserResolvers';

/**
 * @constant resolvers
 * @description Combines user queries and mutations to form the overall GraphQL resolvers.
 */
export const resolvers = {
	Query: {
		/**
		 * @description Contains resolver functions for user-related GraphQL queries.
		 */
		...UserQueries,
	},
	Mutation: {
		/**
		 * @description Contains resolver functions for user-related GraphQL mutations.
		 */
		...UserMutations,
	},
};