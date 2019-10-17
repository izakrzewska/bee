import React, { Component} from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import fetchApiary from '../queries/fetchApiary';

class BeehiveCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ''
        };
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.mutate({
            variables: {
                apiaryId: this.props.apiaryId,
                content: this.state.content
            }
        })
        .then(() => this.setState({ content: ''}))
    }

    render() {
        return (
            <form onSubmit={ this.onSubmit.bind(this)} > 
                <label>Add a lyric</label>
                <input value={ this.state.content } onChange={ e => this.setState({ content: e.target.value })}/>
            
            </form>
        )
    }
}


const mutation = gql`
    mutation addBeehiveToApiary($apiaryId: ID, $content: String){
        addBeehiveToApiary(apiaryId: $apiaryId, content: $content) {
            name
            id
            beehives {
                content
            }
        }
    }
`;

export default graphql(mutation)(BeehiveCreate);