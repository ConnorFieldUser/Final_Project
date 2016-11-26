var Backbone = require('backbone');
var React = require('react');
var django = require('../djangoUtils');
var $ = require('jquery');


var FoodItem = Backbone.Model.extend({
  // urlRoot: 'api/items/',
  defaults: {
    quantity: 1
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
  },
});





var FoodItemCollection = Backbone.Collection.extend({
  model: FoodItem,
  // url: 'https://private-02760-finalproject3.apiary-mock.com/questions'
  url: 'api/items/',
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
  url: 'api/carts/latest/add_item/',
  total: function(){
    return this.reduce(function(sum, model){
      return sum + parseFloat(model.get('price'));
    }, 0);
  }
});




var Cart = Backbone.Model.extend({
  idAttribute: 'id',
  url: function(){
    return 'api/carts/latest/'
  },
  defaults: {
    cart_items: new CartItemCollection()
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
  },
  save: function(key, val, options){
    // console.log('toJSON', this.get('cart_items'));
    this.set('items', this.get('items').toJSON());
    // this.set('user', localStorage.getItem('id'));
    return Backbone.Model.prototype.save.apply(this, arguments);
  },
  parse: function(data){
    data.items = new CartItemCollection(data.items);
    return data;
  },
});


var NewEmptyCart = Backbone.Model.extend({
  idAttribute: 'id',
  url: 'api/carts/',
  defaults: {
    cart_items: new CartItemCollection()
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
  },
  save: function(key, val, options){
    // console.log('toJSON', this.get('cart_items'));
    this.set('items', this.get('items').toJSON());
    // this.set('user', localStorage.getItem('id'));
    return Backbone.Model.prototype.save.apply(this, arguments);
  },
  parse: function(data){
    data.items = new CartItemCollection(data.items);
    return data;
  },
});

// var NewCart = Backbone.Model.extend({
//   idAttribute: 'id',
//   url: function(){
//     return 'api/carts/latest/add_item/'
//   },
//   defaults: {
//     cart_items: new CartItemCollection()
//   },
//   save: function(key, val, options){
//     this.set('cart_items', this.get('cart_items').toJSON());
//     // this.set('user', localStorage.getItem('id'));
//     return Backbone.Model.prototype.save.apply(this, arguments);
//   },
//   parse: function(data){
//     data.items = new CartItemCollection(data.items);
//     return data;
//   },
//   // getItemsX: function() {
//   //   var items = new CartItemLatest();
//   //   var self = this;
//   //   return items.fetch();
//   // },
//   // getItems: function(){
//   //   var items = new CartItemCollection();
//   //   var self = this;
//   //   return items.fetch().then(function(){
//   //     self.set('items', items)
//   //   });
//   // },
//   initialize: function(){
//     window.account = this;
//     var token = localStorage.getItem('token');
//     var self = this;
//     $.ajaxSetup({
//       beforeSend: function(xhr, settings){
//         xhr.setRequestHeader("Authorization", 'Token ' + token);
//         django.setCsrfToken.call(this, xhr, settings);
//       }
//     });
//   }
// });



module.exports = {
  FoodItem: FoodItem,
  FoodItemCollection: FoodItemCollection,
  Cart: Cart,
  CartItemModel: CartItemModel,
  CartItemCollection: CartItemCollection,
  NewEmptyCart: NewEmptyCart
};
