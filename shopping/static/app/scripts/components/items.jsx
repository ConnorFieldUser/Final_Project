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
  handleDetail: function(item){
    var item = item.attributes
    console.log(item);
    localStorage.setItem("item", JSON.stringify(item));

    // $(itemD.ItemDescription).show();
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
    var quantity = parseInt(this.state.quantity);
    var foodList = this.props.foodCollection.map(function(item){

      return (
        <div className="foodListItem col-md-4 col-sm-6 col-xs-6" key={item.cid}>
          <div className="imageContainer">
            <img className="itemImage" src={item.get('ItemImage')} />
          </div>
          <span className="name">{item.get('Itemname')}</span>
          <span className="hidden"id="descrip">{item.get('ItemDescription')}</span>
          <input onChange={self.handleQuantity} type="text" id='quantity' className="form-control" placeholder="Quantity" />
          <span className="price">Price: $ {item.get('price')}</span>
          <div className="orderButtons">
            <button onClick={function(){self.props.addToOrder(item, self.state.quantity, self.state.price)}} className="addToCartBtn btn btn-danger addCart">Add to Cart</button>
            <button onClick={function(){self.handleDetail(item)}} className="btn btn-danger viewDetail">View Item Details</button>
          </div>
      </div>
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
    console.log('search', search);
    var self = this;
    var foodCollection = this.state.foodCollection;
    foodCollection.fetch({data: {'search_text': search}, emulateJSON: true}).then(function(){
      self.setState({foodCollection: foodCollection});
      console.log('foodCollection', foodCollection);
    });
  },
  handleQuantity: function(e, quantity){
    var quantity  = e.target.value;
    console.log('quantity', quantity);
  },
  addToOrder: function(item, quantity){
    // var price = item.price;
    var item = item.attributes;
    var cart = this.state.cart;
    var orderCollection = this.state.orderCollection;
    console.log('item', item)

    $.ajax({
      url: 'api/carts/latest/add_item/',
      type: 'POST',
      data: ({name:item.Itemname, quantity:quantity, ref_id:item.ItemID}),
      success: function(result){
        console.log('DONE')
      }
    });
  },
  // randomPrice: function(item){
  //   console.log('item!!!', item.get('ItemID'));
  //   // var price = ((Math.random() * 10.50) + 2.00).toFixed(2);
  //   // return price
  //   // console.log('price');
  //   // $.get('api/items/detail/?ref_id=' + item.get('ItemID'));
  //   $.ajax({
  //     url: ('api/items/detail/?ref_id=' + item.get('ItemID')),
  //     type: 'GET',
  //     success: function(result){
  //       console.log(result.price)
  //     }
  //   });
  // },
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
          <h2 className="searchDirections">Please search for grocery items:</h2>
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
