/**
 * @file IncrementUserEntries.ts
 * @description GraphQL mutation for incrementing user entries.
 */

import { DocumentNode, gql } from '@apollo/client';

/**
 * Mutation to increment user entries.
 * @param {String!} email - The email of the user whose entries are to be incremented.
 * @returns {Object} - The updated number of entries for the user.
 */
export const INCREMENT_USER_ENTRIES_MUTATION: DocumentNode = gql`
    mutation IncrementUserEntries($email: String!) {
        incrementUserEntries(email: $email) {
            entries
        }
    }
`;