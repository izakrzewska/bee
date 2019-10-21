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
            colors: [],
            active: false
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

    changeBooleanValue(key, value) {
        this.setState({
            [key]: !value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.mutate({
            variables: {
                apiaryId: this.props.apiaryId,
                content: this.state.content,
                colors: this.state.colors,
                active: this.state.active
            }
        })
        .then(() => {
            this.clearValue("content", "");
            this.clearValue("colors", []);
            this.changeBooleanValue("active", this.state.active);
        })
    }

    render() {
        const { colors } = enums;

        return (
            <form onSubmit={ this.onSubmit.bind(this)} > 
                <label htmlFor='content'>Add a content</label>
                <input id='content' value={ this.state.content } onChange={ e => this.setValue(e, "content")}/>
                <div>
                    <h6>Wybierz kolory ula:</h6>
                    {colors.map(color => {
                        const { id, displayValue } = color;
                        return (
                            <div key={id}>
                                <label key={uuid()} htmlFor={id}>{displayValue}</label>
                                <input key={uuid()} type='checkbox' id={id} value={id} onChange={e => this.chooseBeehiveColor(e.target.value)} />
                            </div>
                        );
                    })}
                </div>
                <div>
                    <label htmlFor='active'>Aktywny:</label>
                    <input type='checkbox' id='active' value={this.state.active} onChange={() => this.changeBooleanValue("active", this.state.active)} />
                </div>
                <button className='btn-floating btn-large red right' onClick={(e) => this.onSubmit(e)}>Dodaj</button>
            </form>
        )
    }
}


const mutation = gql`
    mutation addBeehiveToApiary($apiaryId: ID, $content: String, $colors: [String], $active: Boolean){
        addBeehiveToApiary(apiaryId: $apiaryId, content: $content, colors: $colors, active: $active) {
            name
            id
            beehives {
                content
                colors
                active
            }
        }
    }
`;

export default graphql(mutation)(BeehiveCreate);