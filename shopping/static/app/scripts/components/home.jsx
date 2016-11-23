var React = require('react');
var TemplateContainer = require('../layout/headerTemplate.jsx').TemplateContainer;

var HomeContainer = React.createClass({
  render: function(){
    return(
      // <div className="container">
          <TemplateContainer>
            <div className="row">
              <div className="col-md-12 well">
                <div className="mainImage"></div>
                <div className="homeText">
                  <h1>Welcome to Assistive Shopper!</h1>
                  <h3>Grocery shopping made easy.</h3>
                  <h5>We provide online food selection for a range of supermarkets and a home grocery delivery service.</h5>
                </div>
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
