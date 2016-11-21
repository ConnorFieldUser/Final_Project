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
        xhr.setRequestHeader("Authorization", 'Token ' + self.get('token'));
        django.setCsrfToken.call(this, xhr, settings);
      }
    });
  }
}, {
  signup: function(username, password, callback){
      var user = new User({username: username, password:password});
      console.log('saved')
      var self = this;
      user.save().then(function(data){
        /*
        console.log('data', data);
        user.set('token', data.token);
        console.log('token', data.token);         //Want to user.set('id', data.id) and then save to local storage.  But have to fix sign up issue first.
        localStorage.setItem('token', data.token);
        user.auth();

        localStorage.setItem('user', JSON.stringify(user.toJSON()));
        */
        self.signin(username, password, callback, user);
        //callback(user);

    });
  },
  signin: function(username, password, callback, createdUser){
      var loginUrl = 'api/obtain_token/';
      $.post(loginUrl, {username: username, password: password}).then(function(result){
        console.log('result', result);
        if (createdUser) {
          var user = createdUser;
        } else {
          var user = new User({username: username});
        }
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
  url: function(){
    return 'api/account/profile/'
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

// var AccountCollection = Backbone.Collection.ex

module.exports = {
  User: User,
  Account: Account
};
