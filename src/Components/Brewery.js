import React from 'react';
import GoogleMapReact from 'google-map-react';

const Map = ({ text }) => (
    <div style={{
      color: 'white', 
      background: 'grey',
      padding: '15px 10px',
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '100%',
      transform: 'translate(-50%, -50%)'
    }}>
      {text}
    </div>
  );

class Brewery extends React.Component {
    componentDidMount() {
      this.getBrewery();

      this.setState({
        center: {lat: 40.2732, lng: -76.8867}, //Default center for map
        zoom: 12
      });
    };
  
    getBrewery() {
      this.setState({
        id: this.props.match.params.id
      }, () => {
        fetch(`https://api.openbrewerydb.org/breweries/${this.props.match.params.id}`)
          .then(res => res.json())
          .then((result) => {
            this.setState({ 
              brewery: result,
              center: {
                lat: parseFloat(result.latitude),
                lng: parseFloat(result.longitude)
              },
              zoom: 12
            });
          }, (error) => {
            this.setState({ error });
          }
          );
      });
    };
  
    render() {
      if (this.state == null || this.state.brewery == null) return null;
      const {name, street, city, state, phone, latitude, longitude} = this.state.brewery;

      return (
        <div>
          <p>{this.state.id}</p>
          <p>{name}</p>
          <p>{street}</p>
          <p>{city}</p>
          <p>{state}</p>
          <p>{phone}</p>
          <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact 
                bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY }}
                defaultCenter={this.state.center} defaultZoom={this.state.zoom}>
                <Map 
                    lat={latitude} 
                    lng={longitude}  
                    text={name}
                    center={latitude, longitude}
                />
            </GoogleMapReact>
          </div>
        </div>)
    };
  };

  export default Brewery;