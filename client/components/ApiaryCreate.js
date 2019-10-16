import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, hashHistory } from 'react-router';
import fetchApiaries from '../queries/fetchApiaries';

class ApiaryCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.mutate({
            variables: {
                name: this.state.name
            },
            refetchQueries: [{ query: fetchApiaries }]
        })
        .then(() => {
            hashHistory.push('/');
        });
    }

    render() {
        return (
            <div>
                <Link to="/">Back</Link>
                <h3>Dodaj nową pasiekę</h3>
                <form onSubmit={ this.onSubmit.bind(this) }>
                    <label>Nazwa pasieki:</label>
                    <input 
                        onChange={ event => this.setState({ name: event.target.value })}
                        value={ this.state.name }    
                    />
                </form>
            </div>
        ); 
    }
}

const mutation = gql`
    mutation AddApiary($name: String) {
        addApiary(name: $name) {
            name
        }
    }
`;

export default graphql(mutation)(ApiaryCreate);