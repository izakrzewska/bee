import gql from "graphql-tag";
import CoordinatesTypes from "../../server/schema/coordinates_type";

const apiaryMutations = {
  ADD_APIARY: gql`
    mutation AddApiary($name: String, $numberOfBeehivesInRow: Int, $coordinates: ${CoordinatesTypes.CoordinatesInputType}) {
        addApiary(name: $name, numberOfBeehivesInRow: $numberOfBeehivesInRow, coordinates: $coordinates) {
            name
            numberOfBeehivesInRow
            coordinates {
                lng
                lat
            }
        }
    }
`,
  DELETE_APIARY: gql`
    mutation DeleteApiary($id: ID) {
      deleteApiary(id: $id) {
        id
      }
    }
  `
};

export default apiaryMutations;
