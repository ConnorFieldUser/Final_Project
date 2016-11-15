var $ = require('jquery');
var Backbone = require('backbone');

var User = Backbone.Model.extend({
  auth: function(){
    var self = this;
    $.ajaxSetup({
      beforeSend: function(xhr){
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
    });
  },
  signup: function(){

  }
});

module.exports = {
  User: User
};
