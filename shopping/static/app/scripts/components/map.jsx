var React = require('react');
var Backbone = require('backbone');
var TemplateContainer = require('../layout/headerTemplate.jsx').TemplateContainer;

require("react-dom/package.json"); // react-dom is a peer dependency
require('google-maps-react');


var MapContainer = React.createClass({
  handleClick: function(e){
    e.preventDefault();
    Backbone.history.navigate('#items/', {trigger:true});
  },
  render: function(){
    return (
      <TemplateContainer>
        <h1>Locations</h1>
        <button onClick={this.handleClick} className="btn btn-success navItemsBtn">Next: View Items <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></button>
          
      </TemplateContainer>
    )
  }
});

// React.createClass({
//   fetchPlaces: function(mapProps, map) {
//     const {google} = this.props;
//     const service = new google.maps.places.PlacesService(map);
//     // ...
//   },
//   render: function() {
//     return (
//       <Map google={this.props.google}
//         onReady={this.fetchPlaces}
//         visible={false}>
//           <Listing places={this.state.places} />
//       </Map>
//     )
//   }
// });
//
// <Map google ={this.props.google}
//     style={{width: '100%', height: '100%', position: 'relative'}}
//     className={'map'}
//     zoom={14}>
//     <Marker onClick={this.onMarkerClick}
//       name={"McAbee"}
//       position={{lat: 34.84802340 , lng: -82.39543630}} />
//       <Marker onClick={this.onMarkerClick}
//         name={"Pleasantburg"}
//         position={{lat: 34.8362131 , lng: -82.3666505}} />
//   </Map>

module.exports = {
  MapContainer: MapContainer
}
