import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, hashHistory } from 'react-router';
import fetchApiaries from '../queries/fetchApiaries';
import Map from './MapContainer';

class ApiaryCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            numberOfBeehivesInRow: 0
        };
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.mutate({
            variables: {
                name: this.state.name,
                numberOfBeehivesInRow: this.state.numberOfBeehivesInRow
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
                    <div>
                        <label>Nazwa pasieki:</label>
                        <input 
                            onChange={ event => this.setState({ name: event.target.value })}
                            value={ this.state.name }
                        />
                    </div>
                    <div>
                        <label>Liczba uli w rzędzie:</label>
                        <input 
                            type='number'
                            onChange={ event => this.setState({ numberOfBeehivesInRow: event.target.value })}
                            value={ this.state.numberOfBeehivesInRow }
                        />
                    </div>
                    <div>
                       <Map />
                    </div>
                    <div>
                        <button onClick={(e) => this.onSubmit(e)} className='btn-floating btn-large red right'>Dodaj</button>
                    </div>
                </form>
            </div>
        ); 
    }
}

const mutation = gql`
    mutation AddApiary($name: String, $numberOfBeehivesInRow: Int) {
        addApiary(name: $name, numberOfBeehivesInRow: $numberOfBeehivesInRow) {
            name
            numberOfBeehivesInRow
        }
    }
`;

export default graphql(mutation)(ApiaryCreate);