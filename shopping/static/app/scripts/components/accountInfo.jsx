var Backbone = require('backbone');
var React = require('react');
var $ = require('jquery');
var django = require('../djangoUtils');

var TemplateContainer = require('../layout/headerTemplate.jsx').TemplateContainer;
// var User = require('../models/user.js').User;
var Account = require('../models/user.js').Account;


var AccountForm = React.createClass({
  getInitialState: function() {
    return {
      account: this.props.account
    }
  },
  handleInputChange: function(e){
    var account = this.state.account;

    // var accountInfoField = e. target;

    // var newState = {};
    // newState[accountInfoField.name] = accountInfoField.value;
    account.set(e.target.name, e.target.value);
    // var data = account.toJSON();
    // console.log('data', data);
    this.setState({account: account});
  },
  handleSubmit: function(e){
    e.preventDefault();
    this.props.saveInfo(this.state);
  },
  handlePicture: function(e){
     var attachedFile = e.target.files[0];
     this.setState({profilePic: attachedFile});
   },
  render: function(){
    var account = this.state.account;
    // console.log('account', account.get('city'));
    return (

    <form onSubmit={this.handleSubmit} className="accountForm well">
    <div className="form-group row">
        <label htmlFor="example-text-input" className="col-xs-2 col-form-label">FirstName</label>
        <div className="col-xs-10">
          <input onChange={this.handleInputChange} value={account.get('first_name')} name="first_name" className="form-control" type="text" id="example-text-input" />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="example-text-input" className="col-xs-2 col-form-label">LastName</label>
        <div className="col-xs-10">
          <input onChange={this.handleInputChange} value={account.get('last_name')} name="last_name" className="form-control" type="text"  id="example-text-input" />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="example-text-input" className="col-xs-2 col-form-label">Street Address</label>
        <div className="col-xs-10">
          <input onChange={this.handleInputChange} value={account.get('adress')} name="adress" className="form-control" type="text" id="example-text-input" />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="example-text-input" className="col-xs-2 col-form-label">City</label>
        <div className="col-xs-10">
          <input onChange={this.handleInputChange} value={account.get('city')} name="city" className="form-control" type="text" id="example-text-input" />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="example-text-input" className="col-xs-2 col-form-label">State</label>
        <div className="col-xs-10">
          <input onChange={this.handleInputChange} value={account.get('state')} name="state" className="form-control" type="text" id="example-text-input" />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="example-email-input" className="col-xs-2 col-form-label">Email</label>
        <div className="col-xs-10">
          <input onChange={this.handleInputChange} value={account.get('email')} name="email" className="form-control" type="email" id="example-email-input" />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="example-tel-input" className="col-xs-2 col-form-label">Telephone</label>
        <div className="col-xs-10">
          <input onChange={this.handleInputChange} value={account.get('phone_number')}name="phone_number" className="form-control" type="tel" id="example-tel-input" />
        </div>
      </div>
      <input onChange={this.handlePicture} encType="multipart/form-data" type="file" />
      <button type="submit" className="btn btn-danger">My Information is correct</button>
      </form>
    )
  }
});

var AccountInfoContainer = React.createClass({
  getInitialState: function(){
    return {
      account: new Account()
    };
  },
  componentWillMount: function(){
    this.getAccountInfo();
    // var token = localStorage.getItem('token');
    // // var self = this;
    // $.ajaxSetup({
    //   beforeSend: function(xhr, settings){
    //     xhr.setRequestHeader("Authorization", 'Token ' + token);
    //     django.setCsrfToken.call(this, xhr, settings);
    //   }
    // });
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
      console.log(localStorage.getItem('USERNAME'));
      self.setState({account:account})
    });
  },
  saveInfo: function (userData){

    // console.log('userData', userData);
    var myObj = userData.account.toJSON();
    // console.log('obj', myObj);
    var account = this.state.account;
    // account.unset('id');
    // delete account.id;
    // console.log(myObj);


    //
    // $.ajax({
    //   url: 'api/account/profile/',
    //   type: 'PUT',
    //   data: myObj,
    //   success: function(data){
    //     console.log(data)
    //   }
    // });

    // $.put('api/account/profile/', myObj, function(result){
    //   console.log(result)
    // });


    // console.log(account);
    // console.log('id', account.id);
    // console.log('account', account);
    account.save();
    // account.save({url: account.urlRoot});

    // account.save().then(() => {
        // console.log("info saved");
        // Backbone.history.navigate('items/', {trigger:true})
    // });
  },
  render: function(){
    return (
      <TemplateContainer>
        <h1 className="accountHeader">Account Information</h1>
          <AccountForm account={this.state.account} saveInfo={this.saveInfo}/>
      </TemplateContainer>
    )
  }
});


module.exports = {
  AccountInfoContainer: AccountInfoContainer
};
