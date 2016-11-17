var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var $ = require('jquery');
var django = require('./djangoUtils');

var LoginSignUpContainer = require('./components/login.jsx').LoginSignUpContainer;
var AccountInfoContainer = require('./components/accountInfo.jsx').AccountInfoContainer;
var FoodItemContainer = require('./components/items.jsx').FoodItemContainer;
var HomeContainer = require('./components/home.jsx').HomeContainer;

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'home/': 'home',
    'account/': 'accountInfo',
    'items/' : 'items',
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
  home: function(){
    ReactDOM.render(
      React.createElement(HomeContainer),
      document.getElementById('app')
    )
  },
  accountInfo: function(){
    ReactDOM.render(
      React.createElement(AccountInfoContainer),
      document.getElementById('app')
    )
  },
  items: function(){
    ReactDOM.render(
      React.createElement(FoodItemContainer),
      document.getElementById('app')
    )
  }
});

var router = new AppRouter();

module.exports = router;
