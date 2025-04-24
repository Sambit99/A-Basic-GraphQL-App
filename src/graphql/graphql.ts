import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { graphQlSchema } from './schema/schema.js';
import { graphQlResolver } from './resolvers/resolver.js';

export const connectGraphQL = async (port: number) => {
  const server = new ApolloServer({
    typeDefs: graphQlSchema,
    resolvers: graphQlResolver
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port }
  });

  return { url };
};
