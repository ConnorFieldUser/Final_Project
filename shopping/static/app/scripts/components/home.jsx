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

              <div className="col-md-12 well">
                <h1>Welcome to Store to Door!</h1>
                <div className="description">
                  <h3>Grocery shopping made easy.</h3>
                  <h4>We provide online food selection for a range of Publix supermarkets and a home grocery delivery service in the Greenville area.</h4>
                </div>
              </div>



              <div className="col-md-12 well">
              <h3>How to use this service: </h3>
                <h4>
                  <div className="col-md-12 appDirections">
                    <div className="dirOne col-md-3"><div className="numberOne">1 </div><div className="headingOne">Account</div><span>Please Verify/Provide your Account Information, if you have not done so.</span></div>
                    <div className="dirTwo col-md-3"><div className="numberTwo">2 </div><div className="headingTwo">Locations</div><span>Next, view store locations on the map and select a supermarket where you would like your grocery items delivered from.</span></div>
                    <div className="dirThree col-md-3"><div className="numberThree">3 </div><div className="headingThree">Grocery Items</div><span>Search for grocery items in the search box.  Add item to the cart and view item details.</span></div>
                    <div className="dirFour col-md-3"><div className="numberFour">4 </div><div className="headingFour">Review Cart</div><span>Review your cart and submit! Once you have finished an email will be generated to you containing driver details, a reciept, and an ETA.</span></div>
                  </div>
                  <div className="dirFive ">Thank you for using our service !</div>
                </h4>


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
