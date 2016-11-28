var React = require('react');
var Backbone = require('backbone');
var TemplateContainer = require('../layout/headerTemplate.jsx').TemplateContainer;



var MapContainer = React.createClass({
  handleClick: function(e){
    e.preventDefault();
    Backbone.history.navigate('#items/', {trigger:true});
  },
  handleMap: function(){
    new google.maps.Map(), {
      zoom: 16,
      center: new google.maps.LatLng(-34.397, 150.644),
      mapTypeId: 'roadmap'
    }
  },
  render: function(){
    return (
      <TemplateContainer>
        <h1>Locations</h1>
        <div id="map">{function(){self.handleMap()}}</div>
        <button onClick={this.handleClick} className="btn btn-success navItemsBtn">Next: View Items <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></button>
          <script async defer
         src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDJEwAaweEQb7eNqNzQJ7LpZ7Eqsh8rLdg&callback=initMap">
         </script>
    </TemplateContainer>
    )
  }
});


//STATIC MAP:
// <img src="https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=AIzaSyCWDL-fy7OiIh4k8_aaIGusHC6EhehTRfo" id="map"></img>


module.exports = {
  MapContainer: MapContainer
}
