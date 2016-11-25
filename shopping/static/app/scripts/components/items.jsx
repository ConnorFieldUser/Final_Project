var React = require('react');
var TemplateContainer = require('../layout/headerTemplate.jsx').TemplateContainer;
var models = require('../models/items.js');
var $ = require('jquery');
require('react-bootstrap');




var Order = React.createClass({
  // componentWillReceiveProps: function(nextProps){
  //   var cart = nextProps.cart['attributes']['cart_items'];
  // //    // console.log(nextProps.cart.items);
  //   this.setState({cart: cart});
  // //    console.log('CART', cart);
  // //    // var cart = this.props.cart['items'];
  // },
  render: function(cart){
    var cart = this.props.cart.attributes;
    // console.log('RENDER', cart)

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
  getInitialState: function(){
    var quantity;
    var item;
    var price = this.props.foodCollection.randomPrice();
    return {
      quantity: quantity,
      item: item,
      price: price
    }
  },
  handleQuantity:function(e){
    var quantity = e.target.value;
    this.setState({quantity: quantity});
  },
  handlePrice: function(){
    console.log('price', this.state.price)
    // this.setState({price: food.price})
  },
  render: function(){
    var self = this;
    var foodCollection = this.props.foodCollection;
    var quantity = this.state.quantity;
    // var products = foodCollection['ArrayOfProduct'];
    // console.log('foodCollection', foodCollection[0]);

    var foodList = this.props.foodCollection.map(function(food){
        return (
          <li key={food.id} className="foodListItem col-md-4">
            <span className="name">{food.name} </span>
            <span className="quantity">{food.quantity} </span>
            <input onChange={self.handleQuantity} type="text" id='quantity' className="form-control" placeholder="Quantity" />
            <strong>Price: $ {food.price}</strong>
            <div>
              <button onClick={function(){self.props.addToOrder(food, self.state.quantity, price)}} className="btn btn-danger addCart">Add to Cart</button>
            </div>
        </li>
        );

        // <div className="randomPrice">{self.randomPrice}</div>
        // <button onClick={self.handleClick}>Click</button>


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
  handleQuantity: function(quantity){
    var quantity  = e.target.value;
    console.log('quantity', quantity);
  },
  addToOrder: function(food, quantity, item){

    // var myObj = item.cart.toJSON();
    // console.log('price', price)
    var item = food.id;
    var cart = this.state.cart;
    console.log(cart);
    var orderCollection = this.state.orderCollection;
    delete food.id;
    // console.log('food_item_id', food_item_id);
    // console.log('id', item.id);
    // orderCollection.create({item__name:food.name, quantity:quantity, item: item});
    // console.log('orderCollection', orderCollection);

    // this.setState({orderCollection: orderCollection});
    // var cartData = {item_name : item.name, quantity : 1, item : item.id, id : ''}
    // console.log('cartData', cartData);

    // cart.get('items').add({item_name : item.name, quantity : 1, item : item.id, id : ''});
    // cart.get('cart_items').push(item);
    // console.log('newCart', cart);
    // cart.get('cart_items').add(item);
    // console.log('item', item);
    // console.log('food', food);

    // var user = cart.get('user');

    // cart.save();

    // console.log('saved');
//
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
