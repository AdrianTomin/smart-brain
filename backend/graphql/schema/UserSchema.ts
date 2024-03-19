import { gql } from 'apollo-server-express';
import { DocumentNode } from '@apollo/client';

export const UserSchema: DocumentNode = gql`
    
    type User {
        id: ID!
        firstName: String!
        email: String!
        password: String!
        isActive: Boolean!
        isLoggedIn: Boolean
        entries: Int!
    }

    type Query {
        getCurrentUser: User
    }
    
    type Mutation {
        signup(firstName: String!, email: String!, password: String!): User!
        logout(email: String!): User!
        deleteUserAccount(email: String!): User
        login(email: String!, password: String!): User
        incrementUserEntries(email: String!): User
    }
`;
