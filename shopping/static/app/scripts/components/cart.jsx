var React = require('react');
var Backbone = require('backbone');
var TemplateContainer = require('../layout/headerTemplate.jsx').TemplateContainer;
var models = require('../models/items.js');
var $ = require('jquery');
require('react-bootstrap');


var Order = React.createClass({
  handleClick: function(e){
    e.preventDefault();
    Backbone.history.navigate('#items/', {trigger:true});
  },
  render: function(cart){
    var orderCollection = this.props.orderCollection;
    var cart = this.props.cart.attributes;
    var self = this;

    var order = this.props.cart.get('cart_items').map(function(item){
      return (
        <div className="cartItem row well" key={item.id}>
          <span className="col-md-4">{item.item__name}</span>
          <span className="col-md-4">{item.quantity}</span>
          <span className="col-md-4">{item.price}</span>
          <button onClick={function(){self.props.deleteItem(item)}} className="btn btn-success deleteBtn" type="submit">Delete</button>
        </div>
      );
  });

    return (
      <div>
      <div className="cartHeadings row well">
          <span className="col-md-4">Item</span>
          <span className="col-md-4">Quantity</span>
          <span className="col-md-4">Price</span>
      </div>
      <div className="containsItem">
        {order}
      </div>
      <strong className="total">Total: ${this.props.orderCollection.total()}</strong>
      <div>
        <button className="placeOrderBtn btn btn-warning">Place Order</button>
        <div><button className="btn btn-success backItemsBtn" onClick={self.handleClick}><span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>Back to Item Listing</button></div>
      </div>
    </div>
    )
  }
});

  var CartContainer = React.createClass({
    getInitialState: function(){
    var cart = new models.Cart();
    var orderCollection = new models.CartItemCollection()

    return {
      cart: cart,
      orderCollection
    }
  },
  componentWillMount: function(){
    this.fetchOrder();
  },
  fetchOrder: function(){
    var self = this;
    var cart = this.state.cart;
    cart.fetch().then(function(response){
      console.log('response', response)
        self.setState({cart: cart});
    });
  },
  handleQuantity: function(quantity){
    var quantity  = e.target.value;
    console.log('quantity', quantity);
  },
  deleteItem: function(item){
    var self = this;
    var cart = this.state.cart.get('cart_items');
    console.log('cart', cart);
    // console.log('ITEM', item.id);
    // var item = item.toJSON();
    // console.log('item', cart.indexOf(item));
    // JSON.parse(item);
    console.log('ID', item);
    // var index = cart.indexOf(item);
    // if (index != -1) {
      // delete (item.id);
      // console.log('ID', item.id);
      // cart.splice(index, 1);
      $.ajax({
        url: 'api/carts/latest/remove_item/',
        type: 'POST',
        data: (item),
        success: function(result){
          console.log('DONE')
          self.setState({cart: cart});
        }
      });
    // }
    // return false;
  },

  // addToOrder: function(item, quantity){
  //   var price = item.price;
  //   var cart = this.state.cart;
  //   var orderCollection = this.state.orderCollection;
  //
  //
  //   $.ajax({
  //     url: 'api/carts/latest/add_item/',
  //     type: 'POST',
  //     data: ({name:item.name, price:item.price, quantity:quantity, id:item.id}),
  //     success: function(result){
  //       console.log('DONE')
  //     }
  //   });
  // },
  render: function(){
    var self = this;

    return (
      <TemplateContainer>
        <div className="row well">
          <h1>Cart</h1>
            <Order cart={this.state.cart} orderCollection ={this.state.orderCollection} deleteItem={this.deleteItem}/>
        </div>
      </TemplateContainer>
    )
  }
});

module.exports = {
  CartContainer: CartContainer
}
