import React from 'react';
import GoogleMapReact from 'google-map-react';

class Brewery extends React.Component {
  constructor(){
    super();
    this.state = { //Should state be used here?
      center: {lat: 40.2732, lng: -76.8867}, //Default center for Harrisburg
      zoom: 12
    };
  };

  componentDidMount() {
    this.getBrewery();
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

  renderMarkers() {
    const {name, street, city, state, phone, latitude, longitude} = this.state.brewery;

    let marker = new this.maps.Marker({
      position: this.state.center,
      map: this.map,
      title: name
    });

    marker.addListener('click', () =>{
      this.infoWindow.setContent(
        `<div>
          <p>${name}</p>
          <p>${street}</p>
          <p>${city}</p>
          <p>${state}</p>
          <p>${phone}</p>
        </div>`
      );
      this.infoWindow.open(this.map, marker);
    });
  };
  
  handleGoogleApiLoaded = ({map, maps}) => {
    this.map = map;
    this.maps = maps;
    this.infoWindow = new maps.InfoWindow();

    this.renderMarkers();
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
              bootstrapURLKeys={{key: process.env.REACT_APP_MAPS_API_KEY}}
              defaultCenter={this.state.center} 
              defaultZoom={this.state.zoom}
              onGoogleApiLoaded={this.handleGoogleApiLoaded}>
          </GoogleMapReact>
        </div>
      </div>)
    };
  };

  export default Brewery;