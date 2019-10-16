import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class BeehivesList extends Component {

    onLike(id, likes) {
        this.props.mutate({
            variables: { id },
            optimisticResponse: {
                __typename: 'Mutation',
                likeLyric: {
                    id: id,
                    __typename: 'LyricType',
                    likes: likes + 1
                }
            }
        })
    }

    renderLyrics() {
        return this.props.beehives.map(({ id, content }) => {
            return (
                <li key={id} className='collection-item'>
                    { content }
                </li>
            );
        })
    }
    render() {
    return (
        <ul className='collection'>
            { this.renderLyrics()}
        </ul>
    )
}}

const mutation = gql`
    mutation likeLyric($id: ID) {
        likeLyric(id: $id) {
            id
            likes
        }
    }
`;

export default graphql(mutation)(BeehivesList);