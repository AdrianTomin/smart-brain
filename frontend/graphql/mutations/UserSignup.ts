/**
 * @file UserSignup.ts
 * @description GraphQL mutation for user signup.
 */

import { DocumentNode, gql } from '@apollo/client';

/**
 * Mutation for user signup.
 * @param {String!} firstName - The first name of the user signing up.
 * @param {String!} email - The email of the user signing up.
 * @param {String!} password - The password of the user signing up.
 * @returns {Object} - The user's first name and email after signup.
 */
export const USER_SIGNUP_MUTATION: DocumentNode = gql`
    mutation Signup($firstName: String!, $email: String!, $password: String!) {
        signup(firstName: $firstName, email: $email, password: $password) {
            firstName
            email
        }
    }
`;