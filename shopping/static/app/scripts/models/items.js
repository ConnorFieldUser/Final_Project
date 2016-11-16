var Backbone = require('backbone');

var FoodItem = Backbone.Model.extend({
  defaults: {
    name: '',
    quantity: '',
    price: ''
  },
});

var FoodItemCollection = Backbone.Collection.extend({
  model: FoodItem,
  url: 'http://www.SupermarketAPI.com/api.asmx/SearchByProductName?APIKEY=3f46c23cb1&ItemName=Parsley'
  // url: 'http://www.SupermarketAPI.com/api.asmx/COMMERCIAL_GetGroceries?APIKEY=3f46c23cb1&ItemId=12345'
});

var Order = Backbone.Model.extend({
  defaults: {
    foodItems: new FoodItemCollection()
  },

  urlRoot: ''
});

var OrderCollection = Backbone.Collection.extend({
  model: Order,
  url: ''
});


module.exports = {
  FoodItem: FoodItem,
  FoodItemCollection: FoodItemCollection,
  Order: Order,
  OrderCollection: OrderCollection
};
