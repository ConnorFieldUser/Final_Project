var Backbone = require('backbone');
var React = require('react');
var django = require('../djangoUtils');
var $ = require('jquery');


var FoodItem = Backbone.Model.extend({
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

var Cart = Backbone.Model.extend({
  urlRoot: 'api/carts/',
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
  // defaults: {
    // foodItems: new FoodItemCollection()
  // },
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



module.exports = {
  FoodItem: FoodItem,
  FoodItemCollection: FoodItemCollection,
  Cart: Cart,
  CartItemModel: CartItemModel,
  CartItemCollection: CartItemCollection
};
