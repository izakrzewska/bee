const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;

const Beehive = mongoose.model('beehive');

const BeehiveType = new GraphQLObjectType({
  name:  'BeehiveType',
  fields: () => ({
    id: { type: GraphQLID },
    likes: { type: GraphQLInt },
    content: { type: GraphQLString },
    apiary: {
      type: require('./apiary_type'),
      resolve(parentValue) {
        return Beehive.findById(parentValue).populate('apiary')
          .then(beehive => {
            return beehive.apiary
          });
      }
    }
  })
});

module.exports = BeehiveType;