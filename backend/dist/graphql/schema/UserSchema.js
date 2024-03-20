"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.UserSchema = (0, apollo_server_express_1.gql) `
    
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
//# sourceMappingURL=UserSchema.js.map