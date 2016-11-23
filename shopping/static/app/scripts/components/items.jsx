var React = require('react');
var FoodItemCollection = require('../models/items.js').FoodItemCollection;
var TemplateContainer = require('../layout/headerTemplate.jsx').TemplateContainer;
var models = require('../models/items.js');
var $ = require('jquery');




var Order = React.createClass({
  // componentWillReceiveProps: function(nextProps){
    // var cart = nextProps.cart['attributes'][0];
  //    // console.log(nextProps.cart.items);
  //   this.setState({cart: cart});
  //    console.log('CART', cart);
  //    // var cart = this.props.cart['items'];
  // },
  render: function(){
    var cart = this.props.cart.attributes;
    // console.log('RENDER', cart)
    // console.log('CART', cart.cart_items);

    var order = this.props.cart.get('cart_items').map(function(item){
      return (
        <li key={item.id}>
          {item.item__name}::{item.quantity}
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


var FoodItem = React.createClass({
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

        // <button onClick={self.randomPrice}>Click</button>
        // <div className="randomPrice">{self.randomPrice}</div>


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
    // var newcart = new models.NewCart();
    // var latestCart = new CartItemLatest();

    return {
      foodCollection: foodCollection,
      cart: cart,
      // newcart: newcart
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
    var self = this;
    var foodCollection=this.state.foodCollection;
    foodCollection.fetch().then(function(response){

      self.setState({foodCollection: response})
    });
  },
  fetchOrder: function(){
    var self = this;
    var cart = this.state.cart;
    cart.fetch().then(function(response){
      // cart.getItemsX().then(function(result){
      //   console.log('items', cart);
        self.setState({cart: cart});
    });
  },
  addToOrder: function(item){

    // var myObj = item.cart.toJSON();
    var cart = this.state.cart;
    // console.log('item',item);
    // console.log('cart',newcart);
    // console.log('ITEM', item);
    // console.log('item', item);

    // var cartData = {items: [item], user: 2}
    // console.log('cartData', cartData);

    var food = cart.get('cart_items');
    console.log('item', item);
    console.log('food', food);

    // var user = cart.get('user');

    // cart.create();
    console.log('saved');

    // {url:'api/carts/latest/add_item/'}
      // cart.save(null, {emulateHTTP: true});
    // $.ajax({
    //   url: 'api/carts/latest/',
    //   type: 'PUT',
    //   data: {"user": user, "items": [cart.get('items')]},
    //   success: function(result){
    //     console.log('DONE')
    //   }
    // });

    // this.setState({cart: cart});
  },
  render: function(){
    var self = this;

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
