var React = require('react');
var FoodItemCollection = require('../models/items.js').FoodItemCollection;
var OrderItemCollection = require('../models/items.js').OrderItemCollection;
var OrderModel = require('../models/items.js').Order;
var TemplateContainer = require('../layout/headerTemplate.jsx').TemplateContainer;
var $ = require('jquery');


var Order = React.createClass({
  render: function(){
    var order = this.props.orderCollection.map(function(orderItem){
      return (
        <li key={orderItem.id}>
          {orderItem.get('title')} :: {orderItem.get('price')}
          <button className="btn btn-danger" onClick={function(){self.props.removeItem(orderItem)}}>Remove</button>
        </li>
      );
    });

    return (
      <div className="col-md-4">
        <h2 className="orderHeading">Cart:</h2>
        <ul>
          {order}
        </ul>
        <div className="row">
          <button className="btn btn-warning">Place Order</button>
        </div>
      </div>
    )
  }
});


var FoodItem = React.createClass({
  render: function(){
    var self = this;
    var foodCollection = this.props.foodCollection;
    console.log('foodCollection', foodCollection);
    // var products = foodCollection['ArrayOfProduct'];
    // console.log('products', products);

    // var foodItems = products['Product'];
    // console.log('foodItems', foodItems);
    // var products = products.Product;
    // ['ArrayOfProduct']['Product'];

    var foodList = this.props.foodCollection.map(function(item){
      return (
        <li key={item.ItemID}>
          {item.Itemname}::{item.ItemDescription}
          <button onClick={function(){self.props.addToOrder(item)}} className="btn btn-danger addCart">Add to Cart</button>
        </li>
      );
    });
    return (
      <div className="col-md-8">
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
      // console.log(response);
      // products.map(function(product){
      //   console.log(product);
      // });
      // var arrayData = data.find('Product')
      // console.log(arrayData);
      // var data = response.find('Product');

    return {
      foodCollection: foodCollection,
      orderCollection: orderCollection
    }
  },
  componentWillMount: function(){
    this.fetchItems();
  },
  fetchItems: function(){
    var foodCollection=this.state.foodCollection;
    var self = this;
    foodCollection.fetch().then(function(response){
      var products = response['ArrayOfProduct']['Product'];
      self.setState({foodCollection: products});
    });
  },
  addToOrder: function(item){
    var orderCollection = this.state.orderCollection;
    var orderItem = item;
    // console.log(orderCollection);
    // orderCollection.save()

  },
  render: function(){
    var self = this;
    var foodCollection = this.state.foodCollection;
    // console.log('food', foodCollection);

    return (
        <TemplateContainer>
        <div className="row well">
          <h1>List of Items</h1>
            <FoodItem foodCollection={this.state.foodCollection} addToOrder={this.addToOrder}/>
            <Order orderCollection={this.state.orderCollection} />
        </div>
        </TemplateContainer>
    )
  }
});




module.exports = {
  FoodItemContainer: FoodItemContainer
};
