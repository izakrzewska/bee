const graphql = require('graphql');

const { GraphQLInputObjectType, GraphQLObjectType, GraphQLInt } = graphql;

const PositionType = new GraphQLObjectType({
  name: 'PositionType',
  fields: () => ({
    row: {
      type: GraphQLInt,
    },
    number: {
      type: GraphQLInt,
    },
  }),
});

const PositionInputType = new GraphQLInputObjectType({
  name: 'PositionInputType',
  fields: () => ({
    row: {
      type: GraphQLInt,
    },
    number: {
      type: GraphQLInt,
    },
  }),
});

module.exports = {
  PositionType,
  PositionInputType,
};
