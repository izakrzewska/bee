const graphql = require("graphql");
const {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLFloat
} = graphql;

const CoordinatesType = new GraphQLObjectType({
  name: "CoordinatesType",
  fields: () => ({
    lng: {
      type: GraphQLFloat
    },
    lat: {
      type: GraphQLFloat
    }
  })
});

const CoordinatesInputType = new GraphQLInputObjectType({
  name: "CoordinatesInputType",
  fields: () => ({
    lng: {
      type: GraphQLFloat
    },
    lat: {
      type: GraphQLFloat
    }
  })
});

module.exports = {
  CoordinatesType: CoordinatesType,
  CoordinatesInputType: CoordinatesInputType
};
