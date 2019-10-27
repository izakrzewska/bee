const graphql = require('graphql');
const {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLInt
} = graphql;

const CoordinatesType = new GraphQLObjectType({
  name: 'CoordinatesType',
  fields: () => ({
    long: {
      type: GraphQLInt
    },
    lat: {
      type: GraphQLInt
    }
  })
});

const CoordinatesInputType = new GraphQLInputObjectType({
    name: 'CoordinatesInputType',
    fields: () => ({
        long: {
            type: GraphQLInt
        },
        lat: {
            type: GraphQLInt
        }
    })
});

module.exports = {
    CoordinatesType: CoordinatesType,
    CoordinatesInputType: CoordinatesInputType
}