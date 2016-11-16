var React = require('react');
var FoodItemCollection = require('../models/items.js').FoodItemCollection;

var FoodItem = React.createClass({
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
  FoodItem: FoodItem
};
