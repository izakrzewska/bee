import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import fetchApiary from '../queries/fetchApiary';
import { Link } from 'react-router';
import BeehiveCreate from './BeehiveCreate';
import BeehivesList from './BeehivesList';

class ApiaryDetails extends Component {
    
    render() {
        const { apiary } = this.props.data;

        if (!apiary) { return <div>Loading...</div> }
        const { name, beehives } = apiary;
        return (
            <div>
                <Link to='/'>Back</Link>
                <h3>{ name }</h3>
                <BeehivesList beehives = { beehives } />
                <BeehiveCreate apiaryId={ this.props.params.id }/>
            </div>
        );
    }
}

export default graphql(fetchApiary, {
    options: (props) => { return { variables: { id: props.params.id } } }
})(ApiaryDetails);