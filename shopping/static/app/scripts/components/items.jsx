var React = require('react');
var Backbone = require('backbone');
var TemplateContainer = require('../layout/headerTemplate.jsx').TemplateContainer;
var models = require('../models/items.js');
var CartContainer = require('../components/cart.jsx').CartContainer;
var $ = require('jquery');
require('react-bootstrap');





var FoodItem = React.createClass({
  getInitialState: function(){
    var quantity;
    var search;
    return {
      quantity: quantity,
      search: search
    }
  },
  handleQuantity:function(e){
    var quantity = e.target.value;
    this.setState({quantity: quantity});
  },
  handleDetail: function(e){
    e.preventDefault();
    Backbone.history.navigate('#detail/', {trigger: true});
  },
  handleSearchInput: function(e){
    this.setState({search: e.target.value})
  },
  handleSubmit: function(e){
    e.preventDefault();
    var search = this.state.search;

    this.props.submitForm(search);
  },
  render: function(){
    var self = this;
    var foodCollection = this.props.foodCollection;
    // console.log('foodCollection', foodCollection);
    var quantity = parseInt(this.state.quantity);
    // console.log('price', foodCollection.randomPrice());

    var foodList = this.props.foodCollection.map(function(item){
    //   console.log(item);
    //
      return (
        <li className="foodListItem col-md-4" key={item.cid}>
          <img src={item.get('ItemImage')} />
          <span className="name">{item.get('Itemname')}</span>
          <span className="price">{item.get('ItemDescription')}</span>
          <div>
            <button onClick={self.handleDetail} className="btn btn-danger viewDetail">View Item Details</button>
            <button onClick={function(){self.props.addToOrder(item)}} className="btn btn-danger addCart">Add to Cart</button>
          </div>
      </li>
      );
    });
    return (
      <div className="col-md-12 foodContainer">
        <form onSubmit={this.handleSubmit} className="navbar-form" role="search">
            <div className="input-group add-on">
              <input onChange={this.handleSearchInput} className="form-control" placeholder="Search" name="srch-term" id="srch-term" type="text" value={this.state.search}/>
              <div className="input-group-btn">
                <button className="btn btn-default" type="submit"><i className="glyphicon glyphicon-search"></i></button>
              </div>
            </div>
          </form>
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
      orderCollection,
    }
  },
  submitForm: function(search){
    var self = this;
    var foodCollection = this.state.foodCollection;
    foodCollection.fetch({data: search, emulateHTTP: true}).then(function(){
      self.setState({foodCollection: foodCollection});
      console.log('foodCollection', foodCollection);
    });



    // $.ajax({
    //   url: 'api/supermarket/',
    //   type: 'POST',
    //   data: (search),
    //   success: function(result){
    //     console.log('result', result);
    //     self.setState({foodCollection: foodCollection});
    //     console.log('foodCOLL', foodCollection)
    //   }
    // });
  },
  // fetchItems: function(){
  //   var self = this;
  //   var foodCollection=this.state.foodCollection;
  //   foodCollection.fetch().then(function(response){
  //     console.log('FETCH', response);
  //     self.setState({foodCollection: foodCollection})
  //   });
  // },
  // submitForm: function(search){
  //   this.state.foodCollection.set({search});
  //   this.state.foodCollection.submitForm(search)
  // },
  handleQuantity: function(e, quantity){
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
  handleForward: function(e){
    e.preventDefault();
    Backbone.history.navigate('#cart/', {trigger: true});
  },
  render: function(){
    var self = this;
    return (
      <TemplateContainer>
        <div className="row well">
          <h1>Grocery Items</h1>
            <FoodItem submitForm={this.submitForm} foodCollection={this.state.foodCollection} addToOrder={this.addToOrder} randomPrice={this.randomPrice}/>
            <button onClick={this.handleForward} className="btn btn-success navCartBtn">Next: View Cart <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></button>
      </div>
      </TemplateContainer>
    )
  }
});


module.exports = {
  FoodItemContainer: FoodItemContainer
};
