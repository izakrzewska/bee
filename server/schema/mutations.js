const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
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
        name: { type: GraphQLString }
      },
      resolve(parentValue, { name }) {
        return (new Apiary({ name })).save()
      }
    },
    addBeehiveToApiary: {
      type: ApiaryType,
      args: {
        content: { type: GraphQLString },
        songId: { type: GraphQLID }
      },
      resolve(parentValue, { content, songId }) {
        return Apiary.addBeehive(songId, content);
      }
    },
    likeBeehive: {
      type: BeehiveType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Beehive.like(id);
      }
    },
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