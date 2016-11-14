var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');

var LoginSignUpContainer = require('./components/login.jsx').LoginSignUpContainer;

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index'
  },
  index: function(){
    ReactDOM.render(
      React.createElement(LoginSignUpContainer),
      document.getElementById('app')
    )
  }
});

var router = new AppRouter();

module.exports = router;
