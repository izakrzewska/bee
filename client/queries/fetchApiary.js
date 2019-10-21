import gql from 'graphql-tag';

export default gql`
    query fetchApiary($id: ID!) {
        apiary(id: $id) {
            id
            name
            beehives {
                content
                colors
                active
            }
        }
    }
`;