import gql from 'graphql-tag';
import CoordinatesTypes from '../../server/schema/coordinates_type';
import ApiaryInputType from '../../server/schema/apiary_input_type';

const apiaryMutations = {
  ADD_APIARY: gql`
    mutation AddApiary($name: String, $numberOfBeehivesInRow: Int, $coordinates: ${CoordinatesTypes.CoordinatesInputType}, $active: Boolean) {
        addApiary(name: $name, numberOfBeehivesInRow: $numberOfBeehivesInRow, coordinates: $coordinates, active: $active) {
            name
            numberOfBeehivesInRow
            coordinates {
                lng
                lat
            }
            active
        }
    }
`,
  DELETE_APIARY: gql`
    mutation DeleteApiary($id: ID) {
      deleteApiary(id: $id) {
        id
      }
    }
  `,
  UPDATE_APIARY: gql`
  mutation updateApiary($id: ID, $updatedApiary: ${ApiaryInputType}) {
    updateApiary(id: $id, updatedApiary: $updatedApiary) {
      name
      numberOfBeehivesInRow
      coordinates {
          lng
          lat
      }
      active
    }
  }
`,
};

export default apiaryMutations;
