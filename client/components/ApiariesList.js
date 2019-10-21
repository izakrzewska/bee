import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchApiaries from '../queries/fetchApiaries';

class ApiariesList extends Component {

    onApiaryDelete(id) {
        this.props.mutate({
            variables: { id }
        })
        .then(() => this.props.data.refetch())
    }

    renderApiaries() {
        return this.props.data.apiaries.map(({ id, name, numberOfBeehivesInRow }) => {
            return (
                <li key={id} className='collection-item'>
                    <Link to={`/apiaries/${id}`}>
                    { name }
                    </Link>
                    <div>liczba uli w rzędzie: { numberOfBeehivesInRow } </div>
                    <i className='material-icons' onClick={ () => this.onApiaryDelete(id) }>delete</i>
                </li>

            )
        })
    };

    render() {
        if (this.props.data.loading) {
            return <div>Loading...</div>
        } else {
            return (
                <div>
                <ul className='collection'>
                    { this.renderApiaries() }
                </ul>
                <Link to="/apiaries/new" className='btn-floating btn-large red right'><i className='material-icons'>add</i></Link>
                </div>
            );
        }
    }
}

const mutation = gql`
    mutation DeleteApiary($id: ID) {
        deleteApiary(id: $id) {
            id
        }
    }
`;

export default graphql(mutation)(
    graphql(fetchApiaries)(ApiariesList)
);