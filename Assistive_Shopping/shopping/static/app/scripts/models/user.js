var $ = require('jquery');
var Backbone = require('backbone');

var django = require('../djangoUtils');

var User = Backbone.Model.extend({
  defaults: {
    username: '',
    password: ''
  },
  urlRoot: 'create_user/',
  auth: function(){
    var self = this;
    $.ajaxSetup({
      beforeSend: function(xhr, settings){
        xhr.setRequestHeader("Authorization", 'Token ' + self.get('token'));
        django.setCsrfToken.call(this, xhr, settings);
      }
    });
  }
},{
  signin: function(username, password, callback){
      var loginUrl = 'api/obtain_token/';
      $.post(loginUrl, {username: username, password: password}).then(function(result){

        var user = new User();
        user.set('token', result.token);
        user.auth();

        localStorage.setItem('user', JSON.stringify(user.toJSON()));

        callback(user);
        console.log("YOU HAVE NOW LOGGED IN");
      });
    },
  signup: function(){
    // var self = this;
    var username = this.get('username');
    var password = this.get('password');

    this.save().then(function(data){
      signin();
    });
  },
  });

module.exports = {
  User: User
};
