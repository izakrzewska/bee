import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import fetchApiary from '../queries/fetchApiary';
import { Link } from 'react-router';
import BeehiveCreate from './BeehiveCreate';
import BeehivesList from './BeehivesList';

class ApiaryDetails extends Component {
    
    render() {

        const { song } = this.props.data;

        if (!song) { return <div>Loading...</div> }
        const { title, lyrics } = song;
        return (
            <div>
                <Link to='/'>Back</Link>
                <h3>{ title }</h3>
                <BeehivesList lyrics = { lyrics } />
                <BeehiveCreate songId={ this.props.params.id }/>
            </div>
        );
    }
}

export default graphql(fetchApiary, {
    options: (props) => { return { variables: { id: props.params.id } } }
})(ApiaryDetails);