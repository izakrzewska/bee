const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLBoolean, GraphQLInt } = graphql;
const mongoose = require('mongoose');
const Apiary = mongoose.model('apiary');
const Beehive = mongoose.model('beehive');
const ApiaryType = require('./apiary_type');
const BeehiveType = require('./beehive_type');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addApiary: {
      type: ApiaryType,
      args: {
        name: { type: GraphQLString },
        numberOfBeehivesInRow: { type: GraphQLInt }
      },
      resolve(parentValue, { name, numberOfBeehivesInRow }) {
        return (new Apiary({ name, numberOfBeehivesInRow })).save()
      }
    },
    addBeehiveToApiary: {
      type: ApiaryType,
      args: {
        apiaryId: { type: GraphQLID },
        content: { type: GraphQLString },
        colors: { type: new GraphQLList(GraphQLString) },
        active: { type: GraphQLBoolean },
        statuses: { type: new GraphQLList(GraphQLString) }
      },
      resolve(parentValue, { apiaryId, content, colors, active, statuses }) {
        return Apiary.addBeehive(apiaryId, content, colors, active, statuses);
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
        return Apiary.remove({ _id: id });
      }
    }
  }
});

module.exports = mutation;