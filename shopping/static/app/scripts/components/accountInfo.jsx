var Backbone = require('backbone');
var React = require('react');
var TemplateContainer = require('../layout/headerTemplate.jsx').TemplateContainer;
// var User = require('../models/user.js').User;
var Account = require('../models/user.js').Account;


var AccountForm = React.createClass({
  handleInputChange: function(e){
    var accountInfoField = e. target;

    var newState = {};
    newState[accountInfoField.name] = accountInfoField.value;
    this.props.account.set(accountInfoField.name, accountInfoField.value);
    this.setState(newState);

  },
  handleSubmit: function(e){
    e.preventDefault();
    this.props.saveInfo(this.state);
  },
  render: function(){
    var account = this.props.account;
    console.log('account', account.get('city'));
    return (

    <form onSubmit={this.handleSubmit}>
    <div className="form-group row">
        <label htmlFor="example-text-input" className="col-xs-2 col-form-label">FirstName</label>
        <div className="col-xs-10">
          <input onChange={this.handleInputChange} value={account.get('first_name')} name="firstname" className="form-control" type="text" id="example-text-input" />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="example-text-input" className="col-xs-2 col-form-label">LastName</label>
        <div className="col-xs-10">
          <input onChange={this.handleInputChange} value={account.get('last_name')} name="lastname" className="form-control" type="text"  id="example-text-input" />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="example-text-input" className="col-xs-2 col-form-label">Street Address</label>
        <div className="col-xs-10">
          <input onChange={this.handleInputChange} value={account.get('adress')} name="address" className="form-control" type="text" id="example-text-input" />
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
          <input onChange={this.handleInputChange} value={account.get('phone_number')}name="telephone" className="form-control" type="tel" id="example-tel-input" />
        </div>
      </div>
      <button type="submit">My Information is correct</button>
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
  },
  componentWillReceiveProps: function(){
    this.getAccountInfo();
  },
  getAccountInfo: function(){
    var account = this.state.account;
    var self = this;

    var formData = account.fetch().then(function(data){
      // console.log(data.first_name);
      self.setState({account:account})
    });
  },
  saveInfo: function (userData){
    var account = this.state.account;
    // console.log(userData);
    account.set(userData);
    //
    account.save().then(() => {
        console.log("info saved");
        Backbone.history.navigate('items/', {trigger:true})
    });
  },
  render: function(){
    return (
      <TemplateContainer>
        <h1>Account Information</h1>
          <h2>Welcome {localStorage.getItem('username')}</h2>
          <AccountForm account={this.state.account} saveInfo={this.saveInfo}/>
      </TemplateContainer>
    )
  }
});


module.exports = {
  AccountInfoContainer: AccountInfoContainer
};
