import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, hashHistory } from 'react-router';
import fetchApiaries from '../queries/fetchApiaries';
import ApiaryCreateMap from './Map/ApiaryCreateMap';
const CoordinatesTypes = require('../../server/schema/coordinates_type');

class ApiaryCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            numberOfBeehivesInRow: 0,
            userCoordinates: {
                long: 0,
                lat: 0
            },
            newApiaryCoordinates: {
                long: 0,
                lat: 0
            },
            isMarkerVisible: false
        };

        this.setNewApiaryCoordinates = this.setNewApiaryCoordinates.bind(this)
    }

    getUserLocation() {
        const geo = navigator.geolocation;

        if (geo) {
            geo.getCurrentPosition(position => {
                this.setState({
                    userCoordinates: {
                        long: position.coords.longitude,
                        lat: position.coords.latitude
                    }
                });
            })
        } else {
            console.log('geolocation is unavailable');
        }
    }

    
    componentDidMount() {
        this.getUserLocation();
    }

    setNewApiaryCoordinates(coordinates) {
        this.setState({
            isMarkerVisible: true
        });

        this.setState({
            newApiaryCoordinates: {
                long: coordinates.long,
                lat: coordinates.lat
            }
        })
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.mutate({
            variables: {
                name: this.state.name,
                numberOfBeehivesInRow: this.state.numberOfBeehivesInRow,
                coordinates: this.state.newApiaryCoordinates
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
                        <div>My location :</div>
                       <ApiaryCreateMap
                            userCoordinates={ this.state.userCoordinates }
                            setNewApiaryCoordinates = { this.setNewApiaryCoordinates }
                            isMarkerVisible = { this.state.isMarkerVisible }

                        />
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