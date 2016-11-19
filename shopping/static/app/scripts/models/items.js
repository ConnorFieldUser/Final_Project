var Backbone = require('backbone');
var React = require('react');


var FoodItem = Backbone.Model.extend({
  defaults: {
    name: '',
    price: ''
  },
});

var FoodItemCollection = Backbone.Collection.extend({
  model: FoodItem,
  // url: 'https://private-02760-finalproject3.apiary-mock.com/questions'
  url: 'api/items/'
  // url: 'http://www.SupermarketAPI.com/api.asmx/SearchByProductName?APIKEY=3f46c23cb1&ItemName=Parsley'
});

var Cart = Backbone.Model.extend({
  defaults: {
    'item': '',
    'quantity': 1
  },
  urlRoot: 'api/carts/'
  // defaults: {
    // foodItems: new FoodItemCollection()
  // },
});

var CartItemModel = Backbone.Model.extend({

});

var CartItemCollection = Backbone.Collection.extend({
  model: CartItemModel,
  url: 'api/cartitems/'
});



module.exports = {
  FoodItem: FoodItem,
  FoodItemCollection: FoodItemCollection,
  Cart: Cart,
  CartItemModel: CartItemModel,
  CartItemCollection: CartItemCollection
};
