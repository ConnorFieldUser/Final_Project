var Backbone = require('backbone');
var React = require('react');
var $ = require('jquery');
var django = require('../djangoUtils');

var TemplateContainer = require('../layout/headerTemplate.jsx').TemplateContainer;
var Account = require('../models/user.js').Account;
var File = require('../models/user.js').File;


var AccountInfoContainer = React.createClass({
  getInitialState: function(){
    return {
      account: new Account(),
    };
  },
  componentWillMount: function(){
    this.getAccountInfo();
    var token = localStorage.getItem('token');
    $.ajaxSetup({
      beforeSend: function(xhr, settings){
        xhr.setRequestHeader("Authorization", 'Token ' + token);
        django.setCsrfToken.call(this, xhr, settings);
      }
    });
  },
  componentWillReceiveProps: function(){
    this.getAccountInfo();
  },
  getAccountInfo: function(){
    var account = this.state.account;
    var self = this;

    var formData = account.fetch().then(function(data){
      localStorage.setItem('id', data.id);
      localStorage.setItem('USERNAME', data.first_name);
      console.log("your username", localStorage.getItem('USERNAME'));
      self.setState({account:account})
    });
  },
  // handleInputChange: function(e){
  //   var account = this.state.account;

  //   // var accountInfoField = e. target;
  //
  //   // var newState = {};
  //   // newState[accountInfoField.name] = accountInfoField.value;
  //   account.set(e.target.name, e.target.value);
  //   // var data = account.toJSON();
  //   // console.log('data', data);
  //   this.setState({account: account});
  // },
  handleSubmit: function(e){
    e.preventDefault();
    var data = new FormData();
    if (this.state.account){
      var type = 'PUT';
    } else {
      var type = 'POST';
    }
    var url = '/api/account/profile/';
    var image = $('#image')[0].files[0];
    data.append('image', image);
    data.append('firstName', $('#firstName').val());
    data.append('lastName', $('#lastName').val());
    data.append('adress', $('#address').val());
    data.append('city', $('#city').val());
    data.append('state', $('#state').val());
    data.append('zipcode', $('#zipcode').val());
    data.append('phoneNumber', $('#phone_number').val());
    data.append('email', $('#email').val());


    $.ajax({
      url: url,
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      type: type,
      success: function(data){
        console.log('DONE');
        Backbone.history.navigate('#home/', {trigger:true});
        localStorage.setItem('image', account.get('image'));
      },
      error: function(data){
        Backbone.history.navigate('#home/', {trigger:true});
      }
    });
    // this.props.saveInfo(this.state);
  },
  // handlePicture: function(e){
  //   // var file = this.props.file;
  //   var picture = e.target.files[0];
  //   this.state.account.set('image', picture);
  //   this.setState({account: this.state.account});
  //
  //  },

  render: function(){
    var account= this.state.account;
    console.log('account', account.get('image'));

  //   if (this.state.account){
  //     // console.log(account.get('image'))
  //     var imageField= (
  //       <div className="profilePic">
  //       <img src={account.get('image')} />
  //       </div>
  //     )
  //   } else {
  //     var imageField= (
  //       <input id="image" className="profilePic" type="file" name="pic" accept="image/*" />
  //   )
  // }
    return (
    <TemplateContainer>
      <h1 className="accountHeader">Account Information</h1>
        <form onSubmit={this.handleSubmit} className="accountForm well" encType="multipart/form-data">
          <div className="form-group row">
            <label htmlFor="firstName" className="col-xs-2 col-form-label">FirstName</label>
              <div className="col-xs-10">
                <input onChange={this.handleInputChange} value={account.get('first_name')} name="first_name" className="form-control" type="text" id="firstName" />
              </div>
          </div>
          <div className="form-group row">
            <label htmlFor="lastName" className="col-xs-2 col-form-label">LastName</label>
              <div className="col-xs-10">
                <input onChange={this.handleInputChange} value={account.get('last_name')} name="last_name" className="form-control" type="text"  id="lastName" />
              </div>
          </div>
          <div className="form-group row">
            <label htmlFor="address" className="col-xs-2 col-form-label">Street Address</label>
              <div className="col-xs-10">
                <input onChange={this.handleInputChange} value={account.get('adress')} name="adress" className="form-control" type="text" id="address" />
              </div>
          </div>
          <div className="form-group row">
            <label htmlFor="city" className="col-xs-2 col-form-label">City</label>
              <div className="col-xs-10">
                <input onChange={this.handleInputChange} value={account.get('city')} name="city" className="form-control" type="text" id="city" />
              </div>
          </div>
          <div className="form-group row">
            <label htmlFor="state" className="col-xs-2 col-form-label">State</label>
              <div className="col-xs-10">
                <input onChange={this.handleInputChange} value={account.get('state')} name="state" className="form-control" type="text" id="state" />
              </div>
          </div>
          <div className="form-group row">
            <label htmlFor="zipcode" className="col-xs-2 col-form-label">Zipcode</label>
              <div className="col-xs-10">
                <input onChange={this.handleInputChange} value={account.get('zipcode')} name="zipcode" className="form-control" type="text" id="zipcode" />
              </div>
          </div>
          <div className="form-group row">
            <label htmlFor="email" className="col-xs-2 col-form-label">Email</label>
              <div className="col-xs-10">
                <input onChange={this.handleInputChange} value={account.get('email')} name="email" className="form-control" type="email" id="email" />
              </div>
          </div>
          <div className="form-group row">
            <label htmlFor="telephone" className="col-xs-2 col-form-label">Telephone</label>
              <div className="col-xs-10">
                <input onChange={this.handleInputChange} value={account.get('phone_number')} name="phone_number" className="form-control" type="tel" id="telephone" />
              </div>
          </div>
          <div className="form-group row">
            <label htmlFor="image" className="col-xs-2 col-form-label">Profile Picture</label>
              <div className="col-xs-10">
                <input id="image" className="profilePic" type="file" name="pic" accept="image/*" />
             </div>
          </div>
          <button onClick={this.handleSubmit} type="submit" className="btn btn-success accountBtn">My Information is correct <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></button>
          </form>
    </TemplateContainer>
    )
  }
});


module.exports = {
  AccountInfoContainer: AccountInfoContainer
};
