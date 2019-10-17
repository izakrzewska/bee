import React, { Component} from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import fetchApiary from '../queries/fetchApiary';

class BeehiveCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            colors: ['red', 'yellow', 'blue']
        };
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.mutate({
            variables: {
                apiaryId: this.props.apiaryId,
                content: this.state.content,
                colors: this.state.colors
            }
        })
        .then(() => this.setState({ content: ''}))
    }

    render() {
        return (
            <form onSubmit={ this.onSubmit.bind(this)} > 
                <label htmlFor='content'>Add a content</label>
                <input id='content' value={ this.state.content } onChange={ e => this.setState({ content: e.target.value })}/>
                <div>Wybierz kolory ula:</div>
                <label htmlFor='yellow'>Żółty
                <input type='checkbox' id='yellow' value='yellow' onChange={e => console.log(e.target.value)} />
                </label>
                <label htmlFor='red'>Czerwony
                <input type='checkbox' id='red' value='red' onChange={e => console.log(e.target.value)} />
                </label>
                <label htmlFor='green'>Zielony
                <input type='checkbox' id='green' value='green' onChange={e => console.log(e.target.value)} />
                </label>

            </form>
        )
    }
}


const mutation = gql`
    mutation addBeehiveToApiary($apiaryId: ID, $content: String, $colors: [String]){
        addBeehiveToApiary(apiaryId: $apiaryId, content: $content, colors: $colors) {
            name
            id
            beehives {
                content
                colors
            }
        }
    }
`;

export default graphql(mutation)(BeehiveCreate);