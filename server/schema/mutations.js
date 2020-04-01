const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInt,
} = graphql;
const mongoose = require('mongoose');

const Apiary = mongoose.model('apiary');
const Beehive = mongoose.model('beehive');
const ApiaryType = require('./apiary_type');
const BeehiveTypes = require('./beehive_type');
const PositionTypes = require('./position_type');
const CoordinatesTypes = require('./coordinates_type');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addApiary: {
      type: ApiaryType,
      args: {
        name: { type: GraphQLString },
        numberOfBeehivesInRow: { type: GraphQLInt },
        coordinates: { type: CoordinatesTypes.CoordinatesInputType },
        active: { type: GraphQLBoolean },
      },
      resolve(_, {
        name, numberOfBeehivesInRow, coordinates, active,
      }) {
        return new Apiary({
          name,
          numberOfBeehivesInRow,
          coordinates,
          active,
        }).save();
      },
    },
    addBeehiveToApiary: {
      type: ApiaryType,
      args: {
        apiaryId: { type: GraphQLID },
        colors: { type: new GraphQLList(GraphQLString) },
        active: { type: GraphQLBoolean },
        statuses: { type: new GraphQLList(GraphQLString) },
        position: { type: PositionTypes.PositionInputType },
      },
      resolve(_, {
        apiaryId, colors, active, statuses, position,
      }) {
        return Apiary.addBeehive(apiaryId, colors, active, statuses, position);
      },
    },
    deleteApiary: {
      type: ApiaryType,
      args: { id: { type: GraphQLID } },
      resolve(_, { id }) {
        return Apiary.deleteOne({ _id: id });
      },
    },
    desactivateApiary: {
      type: ApiaryType,
      args: { id: { type: GraphQLID } },
      resolve(_, { id }) {
        return Apiary.desactivateApiary({ _id: id });
      },
    },
    updateBeehive: {
      type: BeehiveTypes.BeehiveType,
      args: {
        id: { type: GraphQLID },
        beehiveUpdated: { type: BeehiveTypes.BeehiveInputType },
      },
      resolve(_, { id, beehiveUpdated }) {
        return Beehive.updateBeehive({
          id,
          beehiveUpdated,
        });
      },
    },
  },
});

module.exports = mutation;
