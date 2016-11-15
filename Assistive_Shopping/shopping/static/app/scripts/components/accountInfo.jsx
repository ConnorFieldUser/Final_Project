var Backbone = require('backbone');
var React = require('react');
var TemplateContainer = require('../layout/headerTemplate.jsx').TemplateContainer;


var AccountInfoContainer = React.createClass({
  handleInputChange: function(){

  },
  render: function(){
    return (
      <TemplateContainer>
        <h1>Account Information</h1>
        <h2>Welcome {localStorage.getItem('username')}</h2>
      <div className="form-group row">
        <label htmlFor="example-text-input" className="col-xs-2 col-form-label">FirstName</label>
        <div className="col-xs-10">
          <input onChange={this.handleInputChange} className="form-control" type="text" value="John" id="example-text-input" />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="example-text-input" className="col-xs-2 col-form-label">LastName</label>
        <div className="col-xs-10">
          <input onChange={this.handleInputChange} className="form-control" type="text" value="Smith" id="example-text-input" />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="example-text-input" className="col-xs-2 col-form-label">Street Address</label>
        <div className="col-xs-10">
          <input onChange={this.handleInputChange} className="form-control" type="text" value="123 Something Lane" id="example-text-input" />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="example-text-input" className="col-xs-2 col-form-label">City</label>
        <div className="col-xs-10">
          <input onChange={this.handleInputChange} className="form-control" type="text" value="Greenville" id="example-text-input" />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="example-text-input" className="col-xs-2 col-form-label">State</label>
        <div className="col-xs-10">
          <input onChange={this.handleInputChange} className="form-control" type="text" value="SC" id="example-text-input" />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="example-email-input" className="col-xs-2 col-form-label">Email</label>
        <div className="col-xs-10">
          <input onChange={this.handleInputChange} className="form-control" type="email" value="testing@example.com" id="example-email-input" />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="example-tel-input" className="col-xs-2 col-form-label">Telephone</label>
        <div className="col-xs-10">
          <input onChange={this.handleInputChange} className="form-control" type="tel" value="1-(555)-555-5555" id="example-tel-input" />
        </div>
      </div>
    </TemplateContainer>
    )
  }
});


module.exports = {
  AccountInfoContainer: AccountInfoContainer
};
