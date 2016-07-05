import {
  execute,
  parse,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString } from 'graphql';

var userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
  }
});

var queryRootType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: userType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: function (_, args) {
        return {
          id: args.id,
          name: `foobar ${args.id}`
        };
      }
    }
  }
});

var schema = new GraphQLSchema({
  query: queryRootType,
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      updateUser: {
        type: userType,
        args: {
          id: { type: GraphQLString }
        },
        resolve: function (_, args) {
          console.log(`running updateUser mutation ${args.id}`);
          return {
            id: args.id,
            name: `foobar ${args.id}`
          };
        }
      }
    }
  })
});

const documentAST = parse(`
  mutation Mutation {
    updateUser(id: "1") {
      id
      name
    }
  }
`);

const rootValue = null;
const context = null;
const variables = null;
const operationName = 'mutation';

execute(
  schema,
  documentAST)
  .catch(err => console.log('error', err))
  .then(result => console.log(result));
