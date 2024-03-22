/**
 * @file UserLogin.ts
 * @description GraphQL mutation for user login.
 */

import { DocumentNode, gql } from '@apollo/client';

/**
 * Mutation for user login.
 * @param {String!} email - The email of the user attempting to login.
 * @param {String!} password - The password of the user attempting to login.
 * @returns {Object} - The user's ID, first name, and email upon successful login.
 */
export const USER_LOGIN_MUTATION: DocumentNode = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            id
            firstName
            email
            isActive
            isLoggedIn
			entries
        }
    }
`;