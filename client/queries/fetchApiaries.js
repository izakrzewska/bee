import gql from "graphql-tag";

export default gql`
  {
    apiaries {
      id
      name
      numberOfBeehivesInRow
      beehives {
        content
      }
      coordinates {
        long
        lat
      }
    }
  }
`;
