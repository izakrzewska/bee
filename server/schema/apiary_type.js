const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const BeehiveType = require('./beehive_type');
const Apiary = mongoose.model('apiary');

const ApiaryType = new GraphQLObjectType({
  name:  'ApiaryType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString }
    // beehives: {
    //   type: new GraphQLList(BeehiveType),
    //   resolve(parentValue) {
    //     return Apiary.findLyrics(parentValue.id);
    //   }
    // }
  })
});

module.exports = ApiaryType;