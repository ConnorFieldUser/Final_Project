var React = require('react');
var Backbone = require ('backbone');
var TemplateContainer = require('../layout/headerTemplate.jsx').TemplateContainer;

var HomeContainer = React.createClass({
  handleClick: function(e){
    e.preventDefault();
    Backbone.history.navigate('#map/', {trigger:true});
  },
  render: function(){
    return(
      // <div className="container">
          <TemplateContainer>
            <div className="row">

              <div className="col-md-12 well">
                <div className="mainImage"></div>
              </div>

              <div className="col-md-12 homeText well">
                <h1>Welcome to Assistive Shopper</h1>
                <div className="description">
                  <h3>Grocery shopping made easy.</h3>
                  <h4>We provide online food selection for a range of Publix supermarkets and a home grocery delivery service in the Greenville, Anderson, and Asheville areas.</h4>
                </div>
              </div>

              <div classname="col-md-12 well">
              <h3>How to use this service: </h3>
                <h4 className="appDirections">Please Verify/Provide your Account Information, if you have not done so.
                  Next, view store locations on the map and select a supermarket where you would like your grocery items delivered from.
                  Search for grocery items in the search box.  Add item to the cart and view item details.
                  Review your cart and submit! Once you have finished an email will be generated to you containing driver details, a reciept, and an ETA.</h4>
                <h3>Thank you for using our service !</h3>
                <button onClick={this.handleClick} className="btn btn-success navMap">Next: View the Map <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></button>
              </div>

            </div>
          </TemplateContainer>
        // </div>
    )
  }
});

module.exports = {
  HomeContainer: HomeContainer
}
