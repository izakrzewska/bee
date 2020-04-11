const graphql = require('graphql');
const CoordinatesTypes = require('./coordinates_type');

const {
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLInputObjectType,
} = graphql;


const ApiaryInputType = new GraphQLInputObjectType({
  name: 'ApiaryInputType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    coordinates: { type: CoordinatesTypes.CoordinatesInputType },
    active: { type: GraphQLBoolean },
    beehives: {
      // eslint-disable-next-line global-require
      type: new GraphQLList(require('./beehive_input_type')),
    },
    numberOfBeehivesInRow: { type: GraphQLInt },
  }),
});

module.exports = ApiaryInputType;
