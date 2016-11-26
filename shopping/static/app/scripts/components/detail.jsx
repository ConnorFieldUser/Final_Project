var React = require('react');
var Backbone = require('backbone');
var TemplateContainer = require('../layout/headerTemplate.jsx').TemplateContainer;
var models = require('../models/items.js');
var $ = require('jquery');
require('react-bootstrap');



var DetailContainer = React.createClass({
  // getInitialState: function(){
  //   return {
  //     var foodCollection: new models.FoodItemCollection(),
  //   }
  // },
  // componentWillMount: function(){
  //   var foodCollection = this.state.foodCollection;
  //   foodCollection.fetch().then(() => {
  //     this.setState({foodCollection: foodCollection})
  //   });
  // },
  handleClick: function(e){
    e.preventDefault();
    Backbone.history.navigate('#items/', {trigger:true});
  },
  render: function(){
    return (
      <TemplateContainer>
        <h1>DETAILS HERE</h1>
        <button onClick={this.handleClick} className="btn btn-success"><span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>Back to Listing</button>
      </TemplateContainer>
    )
  }
});




module.exports = {
  DetailContainer: DetailContainer
}
