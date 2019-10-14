const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;

const Beehive = mongoose.model('beehive');

const PositionType = new GraphQLObjectType({
    name: 'PositionType',
    fields: {
        row: { type: GraphQLInt },
        number: { type: GraphQLInt }
    }
});

const BeehiveType = new GraphQLObjectType({
  name:  'BeehiveType',
  fields: () => ({
    id: { type: GraphQLID },
    apiary: {
      type: require('./apiary_type'),
      resolve(parentValue) {
        return Beehive.findById(parentValue).populate('apiary')
          .then(beehive => {
            return beehive.apiary
          });
      }
    },
    position: { 
        type: PositionType
    },
    active: {
        type: GraphQLBoolean
    },
    statuses: {
        type: new GraphQLList(GraphQLString)
    },
    colors: {
        type: new GraphQLList(GraphQLString)
    }
  })
});

module.exports = BeehiveType;