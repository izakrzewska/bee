import gql from 'graphql-tag';
import PositionTypes from '../../server/schema/position_type';
import BeehiveInputType from '../../server/schema/beehive_input_type';

const beehiveMutations = {
  ADD_BEEHIVE: gql`
    mutation addBeehiveToApiary($apiaryId: ID, $colors: [String], $active: Boolean, $statuses: [String], $position: ${PositionTypes.PositionInputType}){
        addBeehiveToApiary(apiaryId: $apiaryId, colors: $colors, active: $active, statuses: $statuses, position: $position) {
            name
            id
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
`,
  UPDATE_BEEHIVE: gql`
    mutation updateBeehive($id: ID, $beehiveUpdated: ${BeehiveInputType}) {
      updateBeehive(id: $id, beehiveUpdated: $beehiveUpdated) {
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
  `,
};

export default beehiveMutations;
