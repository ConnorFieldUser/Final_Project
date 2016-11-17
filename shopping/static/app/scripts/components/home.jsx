var React = require('react');
var TemplateContainer = require('../layout/headerTemplate.jsx').TemplateContainer;

var HomeContainer = React.createClass({
  render: function(){
    return(
      <div className="container">
        <div className="row">
          <TemplateContainer>
          <div className="col-md-12">
            <div className="mainImg"></div>
            <h1>Info about our program here!</h1>
          </div>
          </TemplateContainer>
        </div>
      </div>
    )
  }
});

module.exports = {
  HomeContainer: HomeContainer
}
