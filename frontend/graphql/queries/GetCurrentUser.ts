/**
 * @file GetCurrentUser.ts
 * @description GraphQL query to fetch the current user's details.
 */

import { DocumentNode, gql } from '@apollo/client';

/**
 * GraphQL query to fetch the current user's details.
 * @returns {Object} - The current user's id, firstName, email, entries, isLoggedIn, and isActive status.
 */
export const GET_CURRENT_USER: DocumentNode = gql`
    query GetCurrentUser {
        getCurrentUser {
            id
            firstName
            email
            entries
            isLoggedIn
            isActive
        }
    }
`;