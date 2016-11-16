var React = require('react');
var FoodItemCollection = require('../models/items.js').FoodItemCollection;

var FoodItemContainer = React.createClass({
  render: function(){
    var foodCollection = new FoodItemCollection();
    foodCollection.fetch().then(function(response){
      console.log(response);
    })
    return (
      <h1>Hello</h1>
    )
  }
});



module.exports = {
  FoodItemContainer: FoodItemContainer
};
