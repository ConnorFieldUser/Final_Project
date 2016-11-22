var Backbone = require('backbone');
var React = require('react');
var django = require('../djangoUtils');
var $ = require('jquery');


var FoodItem = Backbone.Model.extend({
  // urlRoot: 'api/items/',
  defaults: {
    name: '',
    price: ''
  },
  initialize: function(){
    window.account = this;
    var token = localStorage.getItem('token');
    var self = this;
    $.ajaxSetup({
      beforeSend: function(xhr, settings){
        xhr.setRequestHeader("Authorization", 'Token ' + token);
        django.setCsrfToken.call(this, xhr, settings);
      }
    });
  }
});

var FoodItemCollection = Backbone.Collection.extend({
  model: FoodItem,
  // url: 'https://private-02760-finalproject3.apiary-mock.com/questions'
  url: 'api/items/'
  // url: 'http://www.SupermarketAPI.com/api.asmx/SearchByProductName?APIKEY=3f46c23cb1&ItemName=Parsley'
});

var CartItemModel = Backbone.Model.extend({
  initialize: function(){
    window.account = this;
    var token = localStorage.getItem('token');
    var self = this;
    $.ajaxSetup({
      beforeSend: function(xhr, settings){
        xhr.setRequestHeader("Authorization", 'Token ' + token);
        django.setCsrfToken.call(this, xhr, settings);
      }
    });
  }
});

var CartItemCollection = Backbone.Collection.extend({
  model: CartItemModel,
  url: 'api/cartitems/'
});



var Cart = Backbone.Model.extend({
  idAttribute: 'id',
  url: function(){
    return 'api/carts/latest/'
  },
  // url: function(){
  //   return 'api/carts/la'
  // },
  defaults: {
    items: new CartItemCollection()
  },
  save: function(key, val, options){
    // this.unset('items');
    this.set('items', this.get('items').toJSON());
    return Backbone.Model.prototype.save.apply(this, arguments);
  },
  parse: function(data){
    data.items = new CartItemCollection(data.items);
    return data;
  },
  // getItemsX: function() {
  //   var items = new CartItemLatest();
  //   var self = this;
  //   return items.fetch();
  // },
  // getItems: function(){
  //   var items = new CartItemCollection();
  //   var self = this;
  //   return items.fetch().then(function(){
  //     self.set('items', items)
  //   });
  // },
  initialize: function(){
    window.account = this;
    var token = localStorage.getItem('token');
    var self = this;
    $.ajaxSetup({
      beforeSend: function(xhr, settings){
        xhr.setRequestHeader("Authorization", 'Token ' + token);
        django.setCsrfToken.call(this, xhr, settings);
      }
    });
  }
});



module.exports = {
  FoodItem: FoodItem,
  FoodItemCollection: FoodItemCollection,
  Cart: Cart,
  CartItemModel: CartItemModel,
  CartItemCollection: CartItemCollection
};
