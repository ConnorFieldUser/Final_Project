var React = require('react');
var TemplateContainer = require('../layout/headerTemplate.jsx').TemplateContainer;



var MapContainer = React.createClass({
  render: function(){
    return (
        <TemplateContainer>
          <div className="row">
            <div className="col-md-12">
              <h1>The Map!</h1>
            </div>
          </div>
        </TemplateContainer>
    )
  }
});

module.exports = {
  MapContainer: MapContainer
}
