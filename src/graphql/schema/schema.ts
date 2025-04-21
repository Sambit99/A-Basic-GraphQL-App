export const graphQlSchema = `#graphql

type User{
    _id: ID!
    fullname: String!
    username: String!
    email: String!
    password: String!
    role: String!
    account_type: String!
    createdAt: String!
    updatedAt: String!
}
 
type Query {
    users: [User]
}
`;
