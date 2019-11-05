import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const Marker = ({ text }) => <div style={{ height: '5px', width: '5px', borderRadius: '50%', backgroundColor: 'black' }}>{text}</div>;

class ApiariesListMap extends Component {

    // ten komponent powinien dostac liste pasiek i przemapowac i wyrenderowac markery dla kazdej pasieki
    // potem powinna byc funkcja onClik na markera, ktory przenosi na pasieke

//   constructor(props) {
//     super(props) 
//     this.state = {
//       newApiaryCoordinates: {
//         long: 0,
//         lat: 0
//       }
//     }
//   }

    // onMapCliked(e) {
    //   this.setState({
    //     newApiaryCoordinates: {
    //       long: e.lng,
    //       lat: e.lat
    //     }
    //   }, () => this.props.setNewApiaryCoordinates(this.state.newApiaryCoordinates))
    // }
  
    render() {

      return (
        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyB3NaWrODZ83svVrKyDxwB_tiW8f7y7xBg' }}
            // defaultCenter={defaultProps.center}
            center={{lng: 21, lat: 52}}
            defaultZoom={13}
            // onClick={(e) => this.onMapCliked(e)}
          >


              {/* <Marker
                lat={this.state.newApiaryCoordinates.lat}
                lng={this.state.newApiaryCoordinates.long}
                text="My Marker"
              />   */}

          </GoogleMapReact>
        </div>
      );
    }
  }
  
export default ApiariesListMap;