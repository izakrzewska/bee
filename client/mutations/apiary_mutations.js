import gql from "graphql-tag";
import CoordinatesTypes from "../../server/schema/coordinates_type";

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
  DESACTIVATE_APIARY: gql`
    mutation desactivateApiary($id: ID) {
      desactivateApiary(id: $id) {
        id
      }
    }
  `
};

export default apiaryMutations;
