const mongoose = require('mongoose');
const graphql = require('graphql');
const PositionTypes = require('./position_type');

const Beehive = mongoose.model('beehive');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean,
} = graphql;

const BeehiveType = new GraphQLObjectType({
  name: 'BeehiveType',
  fields: () => ({
    id: { type: GraphQLID },
    apiary: {
      // eslint-disable-next-line global-require
      type: require('./apiary_type'),
      resolve(parentValue) {
        return Beehive.findById(parentValue)
          .populate('apiary')
          .then((beehive) => beehive.apiary);
      },
    },
    colors: {
      type: new GraphQLList(GraphQLString),
    },
    active: {
      type: GraphQLBoolean,
    },
    statuses: {
      type: new GraphQLList(GraphQLString),
    },
    position: {
      type: PositionTypes.PositionType,
    },
  }),
});


module.exports = BeehiveType;
