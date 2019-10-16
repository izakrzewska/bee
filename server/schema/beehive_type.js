const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString
} = graphql;

const Beehive = mongoose.model('beehive');

const BeehiveType = new GraphQLObjectType({
  name:  'BeehiveType',
  fields: () => ({
    apiary: {
      type: require('./apiary_type'),
      resolve(parentValue) {
        return Beehive.findById(parentValue).populate('apiary')
          .then(beehive => {
            return beehive.apiary
          });
      }
    },
    content: {
        type: GraphQLString
    }
  })
});

module.exports = BeehiveType;