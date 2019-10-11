import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchApiaries from '../queries/fetchApiaries';

class ApiariesList extends Component {

    onSongDelete(id) {
        this.props.mutate({
            variables: { id }
        })
        // this.props.data.refetch() can be used because the query is connected with this component
        .then(() => this.props.data.refetch())
    }

    renderSongs() {
        return (
            <div>Apiares list should be here</div>
        );
        
        // return this.props.data.songs.map(({ id, title }) => {
        //     return (
        //         <li key={id} className='collection-item'>
        //             <Link to={`/songs/${id}`}>
        //             { title }
        //             </Link>
        //             <i className='material-icons' onClick={ () => this.onSongDelete(id) }>delete</i>
        //         </li>

        //     )
        // })
    };

    render() {
        if (this.props.data.loading) {
            return <div>Loading...</div>
        } else {
            return (
                <div>
                <ul className='collection'>
                    { this.renderSongs() }
                </ul>
                <Link to="/apiaries/new" className='btn-floating btn-large red right'><i className='material-icons'>add</i></Link>
                </div>
            );
        }
    }
}

const mutation = gql`
    mutation DeleteSong($id: ID) {
        deleteSong(id: $id) {
            id
        }
    }
`;

export default graphql(mutation)(
    graphql(fetchApiaries)(ApiariesList)
);