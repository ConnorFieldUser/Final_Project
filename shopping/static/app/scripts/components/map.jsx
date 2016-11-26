var React = require('react');
var TemplateContainer = require('../layout/headerTemplate.jsx').TemplateContainer;


var Map = React.createClass({
//   fetchPlaces: function(mapProps, map){
//     const {google} = this.props;
//     const service = new google.maps.places.PlacesService(map);
//   },
//   onMarkerClick: function(props, marker, e){
//     e.preventDefault();
//
//   },
  render: function(){
    return (
      <TemplateContainer>
        <h1>Locations</h1>
      </TemplateContainer>
//       <Map google ={this.props.google}
//         style={{width: '100%', height: '100%', position: 'relative'}}
//         className={'map'}
//         zoom={14}>
//         <Marker onClick={this.onMarkerClick}
//           name={"McAbee"}
//           position={{lat: 34.84802340 , lng: -82.39543630}} />
//           <Marker onClick={this.onMarkerClick}
//             name={"Pleasantburg"}
//             position={{lat: 34.8362131 , lng: -82.3666505}} />
//       </Map>
    )
  }
});


module.exports = {
  Map: Map
}
