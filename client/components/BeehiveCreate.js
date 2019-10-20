import React, { Component} from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import fetchApiary from '../queries/fetchApiary';
import enums from '../enums';
import uuid from 'uuid';

class BeehiveCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            colors: []
        };
    }

    setValue(e, key) {
        this.setState({
            [key]: e.target.value
        });
    }

    clearValue(key, value) {
        this.setState({
            [key]: value
        });
    }

    chooseBeehiveColor(chosenColor) {
        if (this.state.colors.includes(chosenColor)) {
            this.setState({
                colors: this.state.colors.filter(color => color !== chosenColor)
            });
        } else {
            this.setState({
                colors: [...this.state.colors, chosenColor]
            });
        }
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
        .then(() => {
            this.clearValue("content", "");
            this.clearValue("colors", []);
        })
    }

    render() {
        return (
            <form onSubmit={ this.onSubmit.bind(this)} > 
                <label htmlFor='content'>Add a content</label>
                <input id='content' value={ this.state.content } onChange={ e => this.setValue(e, "content")}/>
                <div>
                    <h6>Wybierz kolory ula:</h6>
                    {enums.colors.map(color => {
                        const { id, displayValue } = color;
                        return (
                            <div key={id}>
                                <label key={uuid()} htmlFor={id}>{displayValue}</label>
                                <input key={uuid()} type='checkbox' id={id} value={id} onChange={e => this.chooseBeehiveColor(e.target.value)} />
                            </div>
                        );
                    })}
                </div>
                <button className='btn-floating btn-large red right' onClick={(e) => this.onSubmit(e)}>Dodaj</button>

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