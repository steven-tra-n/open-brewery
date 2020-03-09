import React from 'react';
import GoogleMapReact from 'google-map-react';
import {Link} from "react-router-dom";

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

  // componentDidUpdate(prevsProps){
  //   if (this.props.match.params.id !== prevsProps.match.params.id){
  //     this.getBrewery();
  //   };
  // };

  getBrewery(id) {
    let index;
    let previousBreweryid;
    let nextBreweryid;
    let breweries = this.props.location.state;

    if(id === null || id === undefined){
      id = this.props.match.params.id;
    };
    
    index = breweries.findIndex(brewery => brewery.id == id);
    let disablePrevious = index === 0;
    let disableNext = index === breweries.length - 1;

    previousBreweryid = disablePrevious ? null : breweries[index - 1].id;
    nextBreweryid = disableNext ? null : breweries[index + 1].id;

    this.setState({
      disablePrevious: disablePrevious,
      disableNext: disableNext,
      id: id,
      previousBreweryid: previousBreweryid,
      nextBreweryid: nextBreweryid,
      index: index
    }, () => {
      fetch(`https://api.openbrewerydb.org/breweries/${id}`)
      // fetch(`https://localhost:44328/v1/GetBreweryById?breweryId=${this.props.match.params.id}`)
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
        });
    });
  };

  renderMarkers() {
    const {name, street, city, state, phone} = this.state.brewery;

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
    if ((this.state === null || this.state === undefined) || (this.state.brewery === null || this.state.brewery === undefined)) return null;
    const {name, street, city, state, phone} = this.state.brewery;

    return (
      <div>
        <p>{this.state.id}</p>
        <p>{name}</p>
        <p>{street}</p>
        <p>{city}</p>
        <p>{state}</p>
        <p>{phone}</p>
        <Link to='/home'><td>Home</td></Link>
        <Link to={{ pathname: `/breweries/${this.state.previousBreweryid}`, state: this.breweries }}><td>Previous Brewery</td></Link>
        <Link to={{ pathname: `/breweries/${this.state.nextBreweryid}`, state: this.breweries }}><td>Next Brewery</td></Link>
        {/* <button disabled={this.state.disablePrevious} onClick={() => this.getBrewery(this.state.previousBreweryid)}>Previous Brewery</button> */}
        {/* <button disabled={this.state.disableNext} onClick={() => this.getBrewery(this.state.nextBreweryid)}>Next Brewery</button> */}
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