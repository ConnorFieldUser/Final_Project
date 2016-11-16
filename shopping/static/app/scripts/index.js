// console.log("Hello World!");
var $ = require('jquery');
var Backbone = require('backbone');

require('./router');

//DOM READY
$(function(){
  Backbone.history.start();
});
