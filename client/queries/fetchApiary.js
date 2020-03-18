import gql from "graphql-tag";

export default gql`
  query fetchApiary($id: ID!) {
    apiary(id: $id) {
      id
      name
      numberOfBeehivesInRow
      coordinates {
        lng
        lat
      }
      beehives {
        id
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
