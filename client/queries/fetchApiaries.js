import gql from 'graphql-tag';

export default gql`
  {
    apiaries {
      id
      name
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
