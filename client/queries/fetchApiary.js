import gql from "graphql-tag";

export default gql`
  query fetchApiary($id: ID!) {
    apiary(id: $id) {
      id
      name
      numberOfBeehivesInRow
      coordinates {
        long
        lat
      }
      beehives {
        content
        colors
        active
        statuses
        position {
          row
          number
        }
      }
    }
  }
`;
