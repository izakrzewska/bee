const mongoose = require('mongoose');
const graphql = require('graphql');

const {
  GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull,
} = graphql;
const ApiaryType = require('./apiary_type');
const BeehiveType = require('./beehive_type');

const Beehive = mongoose.model('beehive');
const Apiary = mongoose.model('apiary');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    apiaries: {
      type: new GraphQLList(ApiaryType),
      resolve() {
        return Apiary.find({});
      },
    },
    apiary: {
      type: ApiaryType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, { id }) {
        return Apiary.findById(id);
      },
    },
    beehive: {
      type: BeehiveType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, { id }) {
        return Beehive.findById(id);
      },
    },
  }),
});

module.exports = RootQuery;
