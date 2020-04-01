const mongoose = require('mongoose');
const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInputObjectType,
} = graphql;
const PositionTypes = require('./position_type');

const Beehive = mongoose.model('beehive');

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

const BeehiveInputType = new GraphQLInputObjectType({
  name: 'BeehiveInputType',
  fields: () => ({
    id: { type: GraphQLID },
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
      type: PositionTypes.PositionInputType,
    },
  }),
});

module.exports = {
  BeehiveType,
  BeehiveInputType,
};
