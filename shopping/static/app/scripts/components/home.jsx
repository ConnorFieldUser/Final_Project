var React = require('react');
var TemplateContainer = require('../layout/headerTemplate.jsx').TemplateContainer;

var HomeContainer = React.createClass({
  render: function(){
    return(
      <div className="container">
        <TemplateContainer>
        <div className="row">
          <div className="col-md-12">
            <h1>Info about our program here!</h1>
          </div>
        </div>
        </TemplateContainer>
      </div>
    )
  }
});

module.exports = {
  HomeContainer: HomeContainer
}
