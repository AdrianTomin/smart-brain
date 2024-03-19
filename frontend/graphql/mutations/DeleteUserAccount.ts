/**
 * @file DeleteAccountUser.ts
 * @description GraphQL mutation for deleting a user account.
 */

import { DocumentNode, gql } from '@apollo/client';

/**
 * Mutation to delete a user account.
 * @param {String!} email - The email of the user account to be deleted.
 * @returns {Object} - The deleted user account's email.
 */
export const DELETE_USER_ACCOUNT_MUTATION: DocumentNode = gql`
    mutation DeleteUserAccount($email: String!) {
        deleteUserAccount(email: $email) {
            email
        }
    }
`;