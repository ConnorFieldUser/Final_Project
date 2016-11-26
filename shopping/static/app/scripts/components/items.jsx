var React = require('react');
var TemplateContainer = require('../layout/headerTemplate.jsx').TemplateContainer;
var models = require('../models/items.js');
var CartContainer = require('../components/cart.jsx').CartContainer;
var $ = require('jquery');
require('react-bootstrap');




// var Order = React.createClass({
//   render: function(cart){
//     var orderCollection = this.props.orderCollection;
//     console.log(orderCollection);
//     var cart = this.props.cart.attributes;
//
//     var order = this.props.cart.get('cart_items').map(function(item){
//       return (
//         <li key={item.id}>
//           {item.item__name}::{item.quantity}
//         </li>
//       );
//     });
//
//     return (
//       <div className="col-md-4">
//         <h2 className="orderHeading">Cart:</h2>
//         <ul>
//           {order}
//         </ul>
//         <strong>Total: ${this.props.orderCollection.total()}</strong>
//         <div>
//           <button className="btn btn-warning">Place Order</button>
//         </div>
//       </div>
//     )
//   }
// });


var FoodItem = React.createClass({
  getInitialState: function(){
    var quantity;
    return {
      quantity: quantity,
    }
  },
  handleQuantity:function(e){
    var quantity = e.target.value;
    this.setState({quantity: quantity});
  },
  render: function(){
    var self = this;
    var foodCollection = this.props.foodCollection;
    var quantity = parseInt(this.state.quantity);
    // console.log('price', foodCollection.randomPrice());

    var foodList = this.props.foodCollection.map(function(item){
        return (
          <li key={item.id} className="foodListItem col-md-3">
            <span className="name">{item.name} </span>
            <span className="quantity">{item.quantity} </span>
            <input onChange={self.handleQuantity} type="text" id='quantity' className="form-control" placeholder="Quantity" />
            <span className="price">Price: $ {self.props.randomPrice()}</span>
            <div>
              <button onClick={function(){self.props.addToOrder(item, self.state.quantity, self.state.price)}} className="addToCartBtn btn btn-danger addCart">Add to Cart</button>
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
      <div className="col-md-12 foodContainer">
          <ul>
            {foodList}
          </ul>
      </div>
    )
  }
});


var FoodItemContainer = React.createClass({
  getInitialState: function(){
    var foodCollection = new models.FoodItemCollection();
    var cart = new models.Cart();
    var orderCollection = new models.CartItemCollection()

    return {
      foodCollection: foodCollection,
      cart: cart,
      orderCollection
    }
  },
  componentWillMount: function(){
    this.fetchItems();
  },
  fetchItems: function(){
    var self = this;
    var foodCollection=this.state.foodCollection;
    foodCollection.fetch().then(function(response){

      self.setState({foodCollection: response})
    });
  },
  // fetchOrder: function(){
  //   var self = this;
  //   var cart = this.state.cart;
  //   cart.fetch().then(function(response){
  //     console.log('response', response)
  //       self.setState({cart: cart});
  //   });
  // },
  handleQuantity: function(quantity){
    var quantity  = e.target.value;
    console.log('quantity', quantity);
  },
  addToOrder: function(item, quantity){
    var price = item.price;
    var cart = this.state.cart;
    var orderCollection = this.state.orderCollection;


    $.ajax({
      url: 'api/carts/latest/add_item/',
      type: 'POST',
      data: ({name:item.name, price:item.price, quantity:quantity, id:item.id}),
      success: function(result){
        console.log('DONE')
      }
    });
  },
  randomPrice: function(min, max){
    var price = ((Math.random() * 10.50) + 2.00).toFixed(2);
    return price
    console.log('price');
  },
  render: function(){
    var self = this;
    return (
      <TemplateContainer>
        <div className="row well">
          <h1>Grocery Items</h1>
            <form className="navbar-form" role="search">
                <div className="input-group add-on">
                  <input className="form-control" placeholder="Search" name="srch-term" id="srch-term" type="text" />
                  <div className="input-group-btn">
                    <button className="btn btn-default" type="submit"><i className="glyphicon glyphicon-search"></i></button>
                  </div>
                </div>
              </form>
            <FoodItem foodCollection={this.state.foodCollection} addToOrder={this.addToOrder} randomPrice={this.randomPrice}/>
        </div>
      </TemplateContainer>
    )
  }
});


// <Order cart={this.state.cart} orderCollection ={this.state.orderCollection}/>


module.exports = {
  FoodItemContainer: FoodItemContainer
};
