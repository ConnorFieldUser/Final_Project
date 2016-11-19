var $ = require('jquery');
var Backbone = require('backbone');
var React = require('react');

var django = require('../djangoUtils');

var User = Backbone.Model.extend({
  urlRoot: 'api/user/create/',
  auth: function(){
    var token = localStorage.getItem('token');
    var self = this;
    $.ajaxSetup({
      beforeSend: function(xhr, settings){
        xhr.setRequestHeader("Authorization", 'Token ' + token);
        django.setCsrfToken.call(this, xhr, settings);
      }
    });
  }
}, {
  signup: function(username, password, callback){
      var user = new User({username: username, password: password});
      console.log('saved')

      user.save().then(function(data){
        user.set('token', data.token);
        localStorage.setItem('token', data.token);
        user.auth();

        localStorage.setItem('user', JSON.stringify(user.toJSON()));

        callback(user);

    });
  },
  signin: function(username, password, callback){
      var loginUrl = 'api/obtain_token/';
      $.post(loginUrl, {username: username, password: password}).then(function(result){
        console.log('userdata', result);
        var user = new User({username: username});
        user.set('token', result.token);
        localStorage.setItem('token', result.token);
        user.auth();

        localStorage.setItem('user', JSON.stringify(user.toJSON()));

        callback(user);
        // console.log("YOU HAVE NOW LOGGED IN");
      });
    }
});

var Account = Backbone.Model.extend({
  idAttribute: 'id',
  urlRoot: function(){
    return 'api/account/profile/'
  },

  initialize: function(){
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

var AccountCollection = Backbone.Collection.ex

module.exports = {
  User: User,
  Account: Account
};
