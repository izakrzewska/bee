const graphql = require('graphql');
const mongoose = require('mongoose');
const ApiaryType = require('./apiary_type');
const BeehiveType = require('./beehive_type');
const BeehiveInputType = require('./beehive_input_type');
const PositionTypes = require('./position_type');
const CoordinatesTypes = require('./coordinates_type');
const ApiaryInputType = require('./apiary_input_type');

const Apiary = mongoose.model('apiary');
const Beehive = mongoose.model('beehive');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInt,
} = graphql;


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
    updateApiary: {
      type: ApiaryType,
      args: {
        id: { type: GraphQLID },
        updatedApiary: { type: ApiaryInputType },
      },
      resolve(_, { id, updatedApiary }) {
        return Apiary.updateApiary({
          id,
          updatedApiary,
        });
      },
    },
    updateBeehive: {
      type: BeehiveType,
      args: {
        id: { type: GraphQLID },
        beehiveUpdated: { type: BeehiveInputType },
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
