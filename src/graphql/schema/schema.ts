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

type Post {
    _id: ID!
    content: String
    imageFile: String
    videoFile: String
    visibility: String!
    likesCount: Int!
    commentsCount: Int!
    sharesCount: Int!

    owner: User
}
 
type Query {
    users: [User]
    posts: [Post]
}
`;
