import gql from "graphql-tag";

export default gql`
  {
    apiaries {
      id
      name
      beehives {
        id
        content
      }
      coordinates {
        lng
        lat
      }
    }
  }
`;
