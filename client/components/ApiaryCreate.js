import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, hashHistory } from 'react-router';
import fetchApiaries from '../queries/fetchApiaries';
import Map from './MapContainer';
const CoordinatesTypes = require('../../server/schema/coordinates_type');

class ApiaryCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            numberOfBeehivesInRow: 0
        };
    }

    getCoordinates() {
        return {
            long: 0,
            lat: 0
        }
    }

    getUserLocation() {
        let longitudeValue;
        let latitudeValue;

        const success = (pos) => {
            console.log(pos.coords.latitude);
            console.log(pos.coords.longitude);

        };

        if ("geolocation" in navigator) {
            console.log('yass');
            navigator.geolocation.getCurrentPosition(success);
        } else {
           console.log('nie ma polozenia usera, co tu zrobic');
        }

        // return {
        //     long: longitudeValue,
        //     lat: latitudeValue
        // }
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.mutate({
            variables: {
                name: this.state.name,
                numberOfBeehivesInRow: this.state.numberOfBeehivesInRow,
                coordinates: this.getCoordinates()
            },
            refetchQueries: [{ query: fetchApiaries }]
        })
        .then(() => {
            hashHistory.push('/');
        });
    }

    render() {

        this.getUserLocation();

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
                        <div>My location :</div>
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
    mutation AddApiary($name: String, $numberOfBeehivesInRow: Int, $coordinates: ${CoordinatesTypes.CoordinatesInputType}) {
        addApiary(name: $name, numberOfBeehivesInRow: $numberOfBeehivesInRow, coordinates: $coordinates) {
            name
            numberOfBeehivesInRow
            coordinates {
                long
                lat
            }
        }
    }
`;

export default graphql(mutation)(ApiaryCreate);