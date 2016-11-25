var Backbone = require('backbone');
var React = require('react');
var $ = require('jquery');
var django = require('../djangoUtils');

var TemplateContainer = require('../layout/headerTemplate.jsx').TemplateContainer;
var Account = require('../models/user.js').Account;
var File = require('../models/user.js').File;


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
    // var file = this.props.file;
    var picture = e.target.files[0];
    this.state.account.set('image', picture);
    this.setState({account: this.state.account});

   },
  render: function(){
    var account = this.state.account;
    return (

    <form onSubmit={this.handleSubmit} className="accountForm well" encType="multipart/form-data" data-ajax='false'>
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
        <label htmlFor="email" className="col-xs-2 col-form-label">Email</label>
        <div className="col-xs-10">
          <input onChange={this.handleInputChange} value={account.get('email')} name="email" className="form-control" type="email" id="email" />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="telephone" className="col-xs-2 col-form-label">Telephone</label>
        <div className="col-xs-10">
          <input onChange={this.handleInputChange} value={account.get('phone_number')}name="phone_number" className="form-control" type="tel" id="telephone" />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="image" className="col-xs-2 col-form-label">Profile Picture</label>
        <div className="col-xs-10">
          <input onChange={this.handlePicture} type="file" name="image" id="image"/>
        </div>
      </div>
      <button type="submit" className="btn btn-success">My Information is correct</button>
      </form>
    )
  }
});

var AccountInfoContainer = React.createClass({
  getInitialState: function(){
    return {
      account: new Account(),
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

    var account = this.state.account;
    // account.set({"image": userData.image})
    console.log(account.get('image'));
    account.save(null, {emulateHTTP: true});

  },
  render: function(){
    return (
      <TemplateContainer>
        <h1 className="accountHeader">Account Information</h1>
          <AccountForm account={this.state.account} saveInfo={this.saveInfo} file={this.state.file}/>
      </TemplateContainer>
    )
  }
});


module.exports = {
  AccountInfoContainer: AccountInfoContainer
};
