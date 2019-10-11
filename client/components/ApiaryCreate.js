import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, hashHistory } from 'react-router';
import fetchApiaries from '../queries/fetchApiaries';

class ApiaryCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ''
        };
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.mutate({
            variables: {
                title: this.state.title
            },
            // this.props.data.refetch() can't be used as the query is connected with another component
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
                <h3>Create a new song</h3>
                <form onSubmit={ this.onSubmit.bind(this) }>
                    <label>Song title:</label>
                    <input 
                        onChange={ event => this.setState({ title: event.target.value })}
                        value={ this.state.title }    
                    />
                </form>
            </div>
        ); 
    }
}

const mutation = gql`
    mutation AddSong($title: String) {
        addSong(title: $title) {
            title
        }
    }
`;

export default graphql(mutation)(ApiaryCreate);