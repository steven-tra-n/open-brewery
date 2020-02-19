import React from 'react';
import GoogleMapReact from 'google-map-react';

// function Map({ text }){
//   return(
//     <div 
//     // style={{
//     //   color: 'white', 
//     //   background: 'grey',
//     //   padding: '15px 10px',
//     //   display: 'inline-flex',
//     //   textAlign: 'center',
//     //   alignItems: 'center',
//     //   justifyContent: 'center',
//     //   borderRadius: '100%',
//     //   transform: 'translate(-50%, -50%)'
//     // }}
//     >
//       {text}
//     </div>
//   );
// };

class Brewery extends React.Component {
  constructor(){
    super();
    this.state = { //Why use state here?
      center: {lat: 40.2732, lng: -76.8867}, //Default center for map
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
  
  handleGoogleApiLoaded = ({map, maps}) => {
    this.map = map;
    this.maps = maps;
    this.infoWindow = new maps.InfoWindow();

    // let service = new maps.places.PlacesService(map);

    // service.nearbySearch({
    //   location: this.state.center,
    //   radius: 2000,
    //   types: ['school']
    // }, this.callback);

    // let callback = (results, status) => {
    //   for(let i = 0; i < results.length; i++){
    //     this.renderMarkers(results[i]);
    //   };
    // };

    let renderMarkers = () => {
      let marker = new this.maps.Marker({
        position: this.state.center,
        map: this.map,
        title: 'Hello World!'
      });

      marker.addListener('click', () =>{
        this.infoWindow.setContent('test');
        this.infoWindow.open(this.map, marker);
      });
    };

  renderMarkers();

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
              bootstrapURLKeys={{ 
                key: process.env.REACT_APP_MAPS_API_KEY
              }}
              defaultCenter={this.state.center} defaultZoom={this.state.zoom}
              onGoogleApiLoaded={this.handleGoogleApiLoaded}>
              {/* <Map 
                  lat={latitude} 
                  lng={longitude}  
                  text={name}
                  center={latitude, longitude}
              /> */}
          </GoogleMapReact>
        </div>
      </div>)
    };
  };

  export default Brewery;