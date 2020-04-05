import gql from 'graphql-tag';

export default gql`
  {
    apiaries {
      id
      name
      numberOfBeehivesInRow
      beehives {
        id
        active
        position {
          row
          number
        }
        colors
      }
      coordinates {
        lng
        lat
      }
      active
    }
  }
`;
