const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString, 
  GraphQLList,
  GraphQLBoolean,
  GraphQLInt
} = graphql;
const PositionTypes = require('./position_type');
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
    },
    colors: {
      type: new GraphQLList(GraphQLString)
    },
    active: {
      type: GraphQLBoolean
    },
    statuses: {
      type: new GraphQLList(GraphQLString)
    },
    position: {
      type: PositionTypes.PositionType
    }
  })
});

module.exports = BeehiveType;
