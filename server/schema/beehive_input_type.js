const graphql = require('graphql');
const PositionTypes = require('./position_type');

const {
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInputObjectType,
} = graphql;


const BeehiveInputType = new GraphQLInputObjectType({
  name: 'BeehiveInputType',
  fields: () => ({
    id: { type: GraphQLID },
    colors: {
      type: new GraphQLList(GraphQLString),
    },
    active: {
      type: GraphQLBoolean,
    },
    statuses: {
      type: new GraphQLList(GraphQLString),
    },
    position: {
      type: PositionTypes.PositionInputType,
    },
  }),
});

module.exports = BeehiveInputType;
