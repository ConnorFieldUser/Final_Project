var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var $ = require('jquery');
var django = require('./djangoUtils');

var LoginSignUpContainer = require('./components/login.jsx').LoginSignUpContainer;
var AccountInfoContainer = require('./components/accountInfo.jsx').AccountInfoContainer;
// var FoodItem = require('./components/items.jsx').FoodItem;

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'account/': 'accountInfo',
    'store/' : 'storeSelect',

  },
  initialize: function(){
      $.ajaxSetup({
        beforeSend: function(xhr, settings){
          django.setCsrfToken.call(this, xhr, settings);
        }
      });
    },
  index: function(){
    ReactDOM.render(
      React.createElement(LoginSignUpContainer),
      document.getElementById('app')
    )
  },
  accountInfo: function(){
    ReactDOM.render(
      React.createElement(AccountInfoContainer),
      document.getElementById('app')
    )
  },

});

var router = new AppRouter();

module.exports = router;
