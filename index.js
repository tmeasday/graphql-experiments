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

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
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
  })
});

const documentAST = parse(`
  {
    user(id: "1") {
      id
      name
    }
  }
`);

execute(schema, documentAST)
  .then(result => console.log(result));
