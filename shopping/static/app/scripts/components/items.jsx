var React = require('react');
var FoodItemCollection = require('../models/items.js').FoodItemCollection;
var TemplateContainer = require('../layout/headerTemplate.jsx').TemplateContainer;
var models = require('../models/items.js');
var $ = require('jquery');




var Order = React.createClass({
  // componentWillReceiveProps: function(nextProps){
  //   var cart = nextProps.cart['attributes'][0];
  //    // console.log(nextProps.cart.items);
  //   this.setState({cart: cart});
  //    console.log('CART', cart);
  //    // var cart = this.props.cart['items'];
  // },
  render: function(){
    var cart = this.props.cart.attributes;
    console.log('RENDER', cart)
    var order = this.props.cart.get('items').map(function(item){
      return (
        <li key={item.id}>
          {item.get('name')}::{item.get('price')}
        </li>
      );
    });

    return (
      <div className="col-md-4">
        <h2 className="orderHeading">Cart:</h2>
        <ul>
          {order}
        </ul>
        <div>
          <button className="btn btn-warning">Place Order</button>
        </div>
      </div>
    )
  }
});



    // var RandomPrice= React.createClass({
    //   var price: function(){
    //     function getRandomInt(2, 10.5) {
    //       return Math.floor(Math.random() * (10.5-2)) + min;
    //     }
    //   },
    //   render: function(){
    //     <div className="randomPrice">{price}</div>
    //   }
    //
    // });

var FoodItem = React.createClass({
  randomPrice: function(){
    Math.floor(Math.random() * 10) + 1;
  },
  render: function(){
    var self = this;
    var foodCollection = this.props.foodCollection;
    // var products = foodCollection['ArrayOfProduct'];

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
      //   <li className="foodListItem col-md-4" key={item.ItemID}>
      //     <img src={item.ItemImage} />
      //     <span className="name">{item.Itemname}</span>
      //     <span className="price">{item.ItemDescription}</span>
      //     <div>
      //       <button onClick={function(){self.props.addToOrder(item)}} className="btn btn-danger addCart">Add to Cart</button>
      //     </div>
      // </li>
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

// <RandomPrice />



var FoodItemContainer = React.createClass({
  getInitialState: function(){
    var foodCollection = new FoodItemCollection();
    var cart = new models.Cart();
    // var latestCart = new CartItemLatest();

    return {
      foodCollection: foodCollection,
      cart: cart
    }
  },
  componentWillMount: function(){
    this.fetchItems();
    this.fetchOrder();
  },
  // componentWillReceiveProps: function(){
  //   this.fetchItems();
  //   // this.fetchOrder();
  // },
  fetchItems: function(){
    var foodCollection=this.state.foodCollection;
    var self = this;
    foodCollection.fetch().then(function(response){
      // var products = response['Product'];
      // console.log('response', products);
      // self.setState({foodCollection: products});
      self.setState({foodCollection: response})
    });
  },
  fetchOrder: function(){
    var self = this;
    var cart = this.state.cart;
    cart.fetch().then(function(response){
      console.log(cart);
      // cart.getItemsX().then(function(result){
      //   console.log('items', cart);
        self.setState({cart: cart});
      // })
      // console.log('response', cart)
      // var cart = response[0]['items'];
      // console.log('RESPONSE', response)
    });
  },
  addToOrder: function(item){

    // var myObj = item.cart.toJSON();
    var cart = this.state.cart;
    // console.log('item',item);
    console.log('cart',cart);
    // console.log('item', item);

    // var cartData = {items: [item], user: 2}
    // console.log('cartData', cartData);
    cart.get('items').add(item);
    cart.save();

    // this.setState({cart: cart});
  },
  render: function(){
    var self = this;
    var foodCollection = this.state.foodCollection;
    // var cart = this.state.cart;
    // console.log('CART', cart);

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
