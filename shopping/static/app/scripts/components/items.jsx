var React = require('react');
var FoodItemCollection = require('../models/items.js').FoodItemCollection;
var TemplateContainer = require('../layout/headerTemplate.jsx').TemplateContainer;
var OrderContainer = require('./order.jsx').OrderContainer;
var models = require('../models/items.js');
var $ = require('jquery');


var FoodItem = React.createClass({
  render: function(){
    var self = this;
    var foodCollection = this.props.foodCollection;
    // console.log('foodCollection', foodCollection);
    // var products = foodCollection['ArrayOfProduct'];
    // console.log('products', products);

    // var foodItems = products['Product'];
    // console.log('foodItems', foodItems);
    // var products = products.Product;
    // ['ArrayOfProduct']['Product'];

    var foodList = this.props.foodCollection.map(function(item){
        return (
          <li key={item.id}>
            {item.name}::{item.price}
            <button onClick={function(){self.props.addToOrder(item)}} className="btn btn-danger addCart">Add to Cart</button>
          </li>
        );
      // return (
      //   <li key={item.ItemID}>
      //     <img src={item.ItemImage} />
      //     {item.Itemname}::{item.ItemDescription}
      //     <button onClick={function(){self.props.addToOrder(item)}} className="btn btn-danger addCart">Add to Cart</button>
      //   </li>
      // );
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
    var cart = new models.Cart();

    return {
      foodCollection: foodCollection,
      cart: cart
    }
  },
  componentWillMount: function(){
    this.fetchItems();
    // this.fetchOrder();
  },
  // fetchOrder: function(){
  //   var self = this;
  //   var cart = this.state.cart;
  //   cart.fetch().then(function(response){
  //     // console.log(response)
  //     var cart = response[0]['items'];
  //     // console.log('CART', cart)
  //     self.setState({cart: cart});
  //   });
  // },
  fetchItems: function(){
    var foodCollection=this.state.foodCollection;
    var self = this;
    foodCollection.fetch().then(function(response){
      console.log('response', response);
      // var products = response['ArrayOfProduct']['Product'];
      // self.setState({foodCollection: products});
      self.setState({foodCollection: response})
    });
  },
  addToOrder: function(item){
    var cart = this.state.cart;
    console.log('item',item);
    console.log('cart',cart);

    var cartData = ({items: item, user: localStorage.getItem('user')})
//
    // var orderItem = item;
    cart.save(cartData);
    // cart.save(item);



    // this.setState({cart: cart});
    // console.log(orderCollection);
  },
  submit: function(){

  },
  render: function(){
    var self = this;
    var foodCollection = this.state.foodCollection;
    // var cart = this.state.cart;

    return (
        <TemplateContainer>
        <div className="row well">
          <h1>List of Items</h1>
            <FoodItem foodCollection={this.state.foodCollection} addToOrder={this.addToOrder}/>
      </div>
        </TemplateContainer>
    )
  }
});


// <OrderContainer />




module.exports = {
  FoodItemContainer: FoodItemContainer
};
