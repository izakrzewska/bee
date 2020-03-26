import gql from "graphql-tag";

export default gql`
  {
    apiaries {
      id
      name
      beehives {
        id
      }
      coordinates {
        lng
        lat
      }
      active
    }
  }
`;
