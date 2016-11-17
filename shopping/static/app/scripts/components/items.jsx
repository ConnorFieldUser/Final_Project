var React = require('react');
var FoodItemCollection = require('../models/items.js').FoodItemCollection;
var OrderItemCollection = require('../models/items.js').OrderItemCollection;
var TemplateContainer = require('../layout/headerTemplate.jsx').TemplateContainer;

var FoodItem = React.createClass({
  // var self = this;
  render: function(){
    var foodList = this.props.foodCollection.map(function(food){
      return (
        <li key={food.id}>
          {food.get('name')}::{food.get('price')}
          <button className="btn btn-danger">Add to Cart</button>
        </li>
      );
    });
    // console.log(foodList);
    return (
      <div className="col-md-4">
        <h2>Grocery Items</h2>
        <ul>
          {foodList}
        </ul>
      </div>
    )
  }
});

var FoodItemContainer = React.createClass({
  getInitialState: function(){
    var foodCollection = new FoodItemCollection();
    var orderCollection = new OrderItemCollection();
    var self = this;
    foodCollection.fetch().then(function(response){
      console.log(response);
      self.setState({foodCollection: foodCollection});
      // console.log(foodCollection)
    });
    return {
      foodCollection: foodCollection,
      orderCollection: orderCollection
    }
  },
  // addToOrder: function(item){
  //   var orderCollection = this.state.orderCollection;
  //   orderCollection.save()
  //
  // },
  render: function(){
    // console.log(foodCollection)
    var self = this;
    var foodCollection = this.state.foodCollection;
    // var foodCollection = new FoodItemCollection();
    return (
      <div className="container">
        <TemplateContainer>
        <div className="row well">
          <h1>List of Items</h1>
            <FoodItem foodCollection={this.state.foodCollection}/>
        </div>
        </TemplateContainer>
      </div>
    )
  }
});



module.exports = {
  FoodItemContainer: FoodItemContainer
};
