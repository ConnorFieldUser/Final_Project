var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var TemplateContainer = require('../layout/headerTemplate.jsx').TemplateContainer;
var $ = require('jquery');
require('backbone-react-component');
var google = require('react-google-maps');
var ScriptjsLoader = require("react-google-maps/lib/async/ScriptjsLoader");
var GoogleMapLoader = google.GoogleMapLoader;
var GoogleMap = google.GoogleMap;
var Marker = google.Marker;
var InfoWindow = google.InfoWindow;
console.log('googlemap', google)

// THANKS GRAYSON HICKS! :
// https://github.com/graysonhicks/parkary/blob/master/app/scripts/components/mapview/dynamicmap.jsx

var GroceryMap = React.createClass({
  getInitialState: function(){
    var state = {
      zoom: 12,
      center: {
        lat:  (34.852619),
        lng:  (-82.394012)
      },
      locations: [
        {id: 1, name:'Mcbee', lat :(34.84802340), lng:(-82.39543630), locName:'Publix McAbee Station', address:'400 E McBee Ave Ste 100, Greenville, SC 29601'},
        {id: 2, name:'Pleasantburg', lat:(34.8362131), lng:(-82.3666505), locName:'Publix McAlister Square', address:'235 S Pleasantburg Dr, Greenville, SC 29607'},
        {id: 3, name:'Pelham', lat:(34.8671485), lng:(-82.3496166), locName:'Publix Supermarket at Pelham Commons', address:' 215 Pelham Rd, Greenville, SC 29615'},
        {id: 4, name:'Woodruff', lat:(34.8182439), lng:(-82.2738621), locName:'Publix at Woodruff', address:'1750 Woodruff Rd, Greenville, SC 29607'},
        {id: 5, name:'Buncombe', lat:(34.9109245), lng:(-82.4298842), locName:'Publix Super Market at University Square', address:'5000 Old Buncombe Rd, Greenville, SC 29617'},
      ],
      windowLoad: [
        {id: 100, name:'Publix McAbee Station', address:'400 E McBee Ave Ste 100, Greenville, SC 29601'},
        {id: 200, name:'Publix McAlister Square', address:'235 S Pleasantburg Dr, Greenville, SC 29607'},
        {id: 300, name:'Publix Supermarket at Pelham Commons', address:' 215 Pelham Rd, Greenville, SC 29615'},
        {id: 400, name:'Publix at Woodruff', address:'1750 Woodruff Rd, Greenville, SC 29607'},
        {id: 500, name:'Publix Super Market at Universtiy Square SC', address:'5000 Old Buncombe Rd, Greenville, SC 29617'},
      ],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
    return state;
  },
  onMarkerClick: function(props, marker, e){
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  },
  onMapClicked: function(props){
    if(this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  },
//   onMarkerClick: function(props, marker, e){
//     console.log("marker clicked")
//     this.setState({
//     selectedPlace: props,
//     activeMarker: marker,
//     showingInfoWindow: true
//   });
// },
  render: function(){
    var self = this;
    var center = this.state.center;
    var zoom = this.state.zoom;
    var locations = this.state.locations;
    var windowLoad = this.state.windowLoad;
    var showingInfoWindow = this.state.showingInfoWindow
    console.log('windowload', showingInfoWindow);

    var markers = locations.map(function(location){
      return (
        <Marker key={location.id} onClick={self.onMarkerClick} name={location.name} position={{lat: location.lat, lng: location.lng}}>
          <InfoWindow marker={self.state.activeMarker} visibile={false}>
            <div>
              <h5>{location.locName}</h5>
              <h6>{location.address}</h6>
            </div>
          </InfoWindow>
        </Marker>
      )
    });
    // var windowLoad = windowLoad.map(function(info){
    //   return (
    //   <InfoWindow key={info.id} marker={self.state.activeMarker} visible={self.state.showingInfoWindow}>
    //     <div>
    //       <h5>{info.name}</h5>
    //       <h6>{info.address}</h6>
    //     </div>
    //   </InfoWindow>
    // )
    // });
    return (
      <section id="map-section" style={{height:"525px"}}>

        <GoogleMapLoader containerElement={
            <div
              {...this.props}
              style={{
                height: "100%"
              }}
            />
          }
           googleMapElement={
            <GoogleMap google={this.props.google} onClick={this.onMapClicked}
              id="map"
              zoom={zoom}
              ref="map"
              center={center}
              defaultCenter={center}
            > {markers}
            </GoogleMap>
          }
        />
      </section>
    );
  }
});

// <Marker onClick={this.onMarkerClick} name={'McAbee'} position={{lat:34.84802340, lng:-82.39543630}} />
// <InfoWindow
//   marker={this.state.activeMarker}
//   visible={this.state.showingInfoWindow}>
//   <div>
//     <h5>Publix McAbee Station</h5>
//     <h6>400 E McBee Ave Ste 100, Greenville, SC 29601</h6>
//   </div>
// </InfoWindow>



var MapContainer = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  handleClick: function(e){
    e.preventDefault();
    Backbone.history.navigate('#items/', {trigger:true});
  },
  render: function(){
    return (
      <TemplateContainer>
        <h1 className="locationTitle">Locations</h1>
          <GroceryMap lat={34.852619} long={-82.394012} />
        <button onClick={this.handleClick} className="btn btn-success navItemsBtn">Next: View Items <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></button>
    </TemplateContainer>
    )
  }
});


//STATIC MAP:
// <img src="https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=AIzaSyCWDL-fy7OiIh4k8_aaIGusHC6EhehTRfo" id="map"></img>


module.exports = {
  MapContainer: MapContainer
}
