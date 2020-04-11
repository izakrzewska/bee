const mongoose = require('mongoose');
const graphql = require('graphql');
const CoordinatesTypes = require('./coordinates_type');
const BeehiveType = require('./beehive_type');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean,
} = graphql;

const Apiary = mongoose.model('apiary');

const ApiaryType = new GraphQLObjectType({
  name: 'ApiaryType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    coordinates: { type: CoordinatesTypes.CoordinatesType },
    active: { type: GraphQLBoolean },
    beehives: {
      type: new GraphQLList(BeehiveType),
      resolve(parentValue) {
        return Apiary.findApiary(parentValue.id);
      },
    },
    numberOfBeehivesInRow: { type: GraphQLInt },
  }),
});

module.exports = ApiaryType;
