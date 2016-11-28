var React = require('react');
var Backbone = require('backbone');
var TemplateContainer = require('../layout/headerTemplate.jsx').TemplateContainer;
var models = require('../models/items.js');
var $ = require('jquery');
require('react-bootstrap');



var DetailContainer = React.createClass({
  handleClick: function(e){
    e.preventDefault();
    Backbone.history.navigate('#items/', {trigger:true});
  },
  render: function(){
      var item = JSON.parse(localStorage.getItem('item'));
      console.log('item', item);
      return (
        <TemplateContainer>
          <h1 className="itemDetailHeader">Item Detail</h1>
            <div className="foodListItem col-md-offset-4 col-md-4 col-sm-offset-4 col-sm-4 well" key={item.cid}>
              <img className="itemDetailImg" src={item.ItemImage} />
              <h3>{item.Itemname}</h3>
              <h4>{item.ItemDescription}</h4>
            </div>
            <div className="col-md-12">
              <button onClick={this.handleClick} className="btn btn-success"><span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>Back to Listing</button>
            </div>
      </TemplateContainer>
      );
    }
});




module.exports = {
  DetailContainer: DetailContainer
}
