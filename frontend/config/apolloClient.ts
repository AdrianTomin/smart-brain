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
	uri: 'https://smart-brain-api-nine.vercel.app/graphql', // for localhost -> http://localhost:4000/graphql // 'https://smart-brain-api-nine.vercel.app/graphql'
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