/**
 * @file UserLogout.ts
 * @description GraphQL mutation for user logout.
 */

import { DocumentNode, gql } from '@apollo/client';

/**
 * Mutation for user logout.
 * @param {String!} email - The email of the user attempting to logout.
 * @returns {Object} - Whether the user is logged in after logout.
 */
export const USER_LOGOUT_MUTATION: DocumentNode = gql`
    mutation Logout($email: String!) {
        logout(email: $email) {
            isLoggedIn
        }
    }
`;