const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLInputObjectType
} = graphql;
const mongoose = require("mongoose");
const Apiary = mongoose.model("apiary");
const Beehive = mongoose.model("beehive");
const ApiaryType = require("./apiary_type");
const BeehiveType = require("./beehive_type");
const PositionTypes = require("./position_type");
const CoordinatesTypes = require("./coordinates_type");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addApiary: {
      type: ApiaryType,
      args: {
        name: { type: GraphQLString },
        numberOfBeehivesInRow: { type: GraphQLInt },
        coordinates: { type: CoordinatesTypes.CoordinatesInputType }
      },
      resolve(parentValue, { name, numberOfBeehivesInRow, coordinates }) {
        return new Apiary({ name, numberOfBeehivesInRow, coordinates }).save();
      }
    },
    addBeehiveToApiary: {
      type: ApiaryType,
      args: {
        apiaryId: { type: GraphQLID },
        colors: { type: new GraphQLList(GraphQLString) },
        active: { type: GraphQLBoolean },
        statuses: { type: new GraphQLList(GraphQLString) },
        position: { type: PositionTypes.PositionInputType }
      },
      resolve(parentValue, { apiaryId, colors, active, statuses, position }) {
        return Apiary.addBeehive(apiaryId, colors, active, statuses, position);
      }
    },
    // likeBeehive: {
    //   type: BeehiveType,
    //   args: { id: { type: GraphQLID } },
    //   resolve(parentValue, { id }) {
    //     return Beehive.like(id);
    //   }
    // },
    deleteApiary: {
      type: ApiaryType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Apiary.deleteOne({ _id: id });
      }
    }
  }
});

module.exports = mutation;
