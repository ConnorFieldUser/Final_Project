var React = require('react');
var Backbone = require ('backbone');
var TemplateContainer = require('../layout/headerTemplate.jsx').TemplateContainer;

var FinishedContainer = React.createClass({
  render: function(){
    return (
      <TemplateContainer>
        <h1 className="finished well">Your Order has been Placed! Thank you for using our service.</h1>
      </TemplateContainer>
    )
  }
});

module.exports = {
  FinishedContainer: FinishedContainer
}
