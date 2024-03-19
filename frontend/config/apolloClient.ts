/**
 * @file apolloClient.ts
 * @description Configuration for Apollo Client used for making GraphQL requests.
 */

import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

/**
 * @constant httpLink
 * @description HTTP link to the GraphQL server.
 */
const httpLink = new HttpLink({
	uri: 'http://localhost:4000/graphql',
	credentials: 'include',
});

/**
 * @constant client
 * @description Apollo Client instance configured with HTTP link and in-memory cache.
 */
export const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
});