var React = require('react');
var FoodItemCollection = require('../models/items.js').FoodItemCollection;
var TemplateContainer = require('../layout/headerTemplate.jsx').TemplateContainer;
// var OrderContainer = require('./order.jsx').OrderContainer;
var models = require('../models/items.js');
var $ = require('jquery');

var Order = React.createClass({
  componentWillReceiveProps: function(nextProps){
    var cart = nextProps.cart;
  //   // console.log(nextProps.cart.items);
  //   this.setState({cart: cart});
    console.log('CART', cart);
  //   // var cart = this.props.cart['items'];
  },
  render: function(cart){
    var cart = this.props.cart;
    // console.log('RENDER', cart);
    // console.log(cart);
    // var order = this.props.cart.items.map(function(item){
    //   return (
    //     <li key={item.id}>
    //       {item.get('name')}::{item.get('price')}
    //     </li>
    //   );
    // });

    return (
      <div className="col-md-4">
        <h2 className="orderHeading">Cart:</h2>
        <ul>
        </ul>
        <div>
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
    // console.log('foodCollection', foodCollection);
    // var products = foodCollection['ArrayOfProduct'];
    // console.log('products', products);

    // var foodItems = products['Product'];
    // console.log('foodItems', foodItems);
    // var products = products.Product;
    // ['ArrayOfProduct']['Product'];

    var foodList = this.props.foodCollection.map(function(item){
        return (
          <li key={item.id} className="foodListItem col-md-4">
            <span className="name">{item.name} </span>
            <span className="price">$ {item.price} </span>
            <div>
              <button onClick={function(){self.props.addToOrder(item)}} className="btn btn-danger addCart">Add to Cart</button>
            </div>
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
      <div className="col-md-8 foodContainer">
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
    this.fetchOrder();
  },
  componentWillReceiveProps: function(){
    this.fetchItems();
    this.fetchOrder();
  },
  fetchItems: function(){
    var foodCollection=this.state.foodCollection;
    var self = this;
    foodCollection.fetch().then(function(response){
      // console.log('response', response);
      // var products = response['ArrayOfProduct']['Product'];
      // self.setState({foodCollection: products});
      self.setState({foodCollection: response})
    });
  },
  fetchOrder: function(){
    var self = this;
    var cart = this.state.cart;
    cart.fetch().then(function(response){
      console.log('response', response[0]['items'])
      // var cart = response[0]['items'];
      // console.log('RESPONSE', response)
      self.setState({cart: response});
    });
  },
  addToOrder: function(item){
    var cart = this.state.cart;
    console.log('item',item);
    console.log('cart',cart);

    var cartData = {items: [item], user: 2}

    // var orderItem = item;
    cart.save({cartData});
    // cart.save(item);



    // this.setState({cart: cart});
  },
  // submit: function(){
  //
  // },
  render: function(){
    var self = this;
    var foodCollection = this.state.foodCollection;
    var cart = this.state.cart;

    return (
      <TemplateContainer>
        <div className="row well">
          <h1>List of Items</h1>
            <FoodItem foodCollection={this.state.foodCollection} addToOrder={this.addToOrder}/>
            <Order cart={this.state.cart}/>
        </div>
      </TemplateContainer>
    )
  }
});






module.exports = {
  FoodItemContainer: FoodItemContainer
};
