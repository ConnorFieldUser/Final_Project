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
  url: '/api/items/'
  // url: 'http://www.SupermarketAPI.com/api.asmx/SearchByProductName?APIKEY=3f46c23cb1&ItemName=Parsley'
});

var Order = Backbone.Model.extend({
  defaults: {
    foodItems: new FoodItemCollection()
  },

  urlRoot: ''
});

var OrderItemCollection = Backbone.Collection.extend({
  model: Order,
  url: ''
});


module.exports = {
  FoodItem: FoodItem,
  FoodItemCollection: FoodItemCollection,
  Order: Order,
  OrderItemCollection: OrderItemCollection
};
